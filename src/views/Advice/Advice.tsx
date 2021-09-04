import {
  Card, List, Tag, Typography,
} from 'antd';
import cn from 'classnames';
import { useEffect, useState } from 'react';
import request from '../../utils/request';
import { IMyFund } from '../MyLofFundManage/types';
import Big from 'big.js';

import styles from './Advice.less';
import { IFund } from './types';
import { resolveOuterSellFeeById } from './outerSellFeeResolver';

const { Text, Link } = Typography;

interface AdviceProps {
  className?: string;
}

export const outerBuyDiscount = 0.1;
export const innerBuyFeeRt = 0.02;
export const innerSellFeeRt = 0.02;

interface IAdvice {
  key: string;
  type: '折价' | '溢价';
  exceptRt: number;
  except: number;
  amount: number;
  operate: string; // 场内买入份额，场外卖出份额/ 场外买入金额，场内卖出份额
}

export function Advice(props: AdviceProps) {
  const { className } = props;
  const [advices, setAdvices] = useState<IAdvice[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const requestStock = request.get('/lof-fund/stock');
    const requestIndex = request.get('/lof-fund/index');
    const requestMyLof = request.get('/my-fund');
    setLoading(true);
    Promise.all([requestIndex, requestStock, requestMyLof])
      .then(([indexList, stockList, myLofList]) => {
        const lofMap: { [key: string]: IFund } = {};
        for (const s of stockList) {
          const item = s as IFund;
          lofMap[item.fundId] = item;
        }
        for (const i of indexList) {
          const item = i as IFund;
          lofMap[item.fundId] = item;
        }

        const advices: IAdvice[] = [];

        for (const m of myLofList) {
          const item = m as IMyFund;
          const cur = lofMap[item.fundId];
          if (cur) {
            const discount = new Big(parseFloat(cur.discountRt)); // 差别

            const overFee = new Big(getOverFee(cur));

            const holdDays = new Big(getHoldDays(item));
            const disCountFee = new Big(getDiscountFee(cur, holdDays.toNumber()));

            const overExcept = discount.minus(overFee);
            if (overExcept.toNumber() > 0 && cur.applyStatus === '开放') {
              const total = new Big(cur.estimateValue).times(new Big(item.amount));
              // 溢价
              advices.push({
                key: item._id,
                type: '溢价',
                exceptRt: overExcept.toNumber(),
                except: total.times(overExcept).div(100).toNumber(),
                amount: item.amount,
                operate: `【${cur.fundNm}】：场外买入金额${total.toNumber()}，场内卖出${item.amount}份`,
              });
            } else if (discount.add(disCountFee).toNumber() < 0 && cur.redeemStatus === '开放') {
              // 折价
              const exceptRt = Math.abs(discount.add(disCountFee).toNumber());
              const total = new Big(cur.estimateValue).times(new Big(item.amount));
              advices.push({
                key: item._id,
                type: '折价',
                exceptRt,
                except: total.times(exceptRt).div(100).toNumber(),
                amount: item.amount,
                operate: `【${cur.fundNm}】：场内买入${item.amount}份，场外卖出${item.amount}份`,
              });
            }
          }
        }

        advices.sort((a, b) => b.exceptRt - a.exceptRt);
        setAdvices(advices);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className={cn(styles.Advice, className)}>
      <Card title="建议">
        <List
          loading={loading}
          bordered
          dataSource={advices}
          key="key"
          renderItem={(item) => (
            <List.Item>
              {item.type === '溢价' && <Tag color="#f50">{item.type}</Tag>}
              {item.type === '折价' && <Tag color="#108ee9">{item.type}</Tag>}
              {item.operate}
              <Text type="success">
                (
                {item.exceptRt}
                )
              </Text>
              <Text type="secondary">
                [
                {item.except}
                ]
              </Text>
            </List.Item>
          )}
        />
      </Card>
    </div>
  );
}
function getHoldDays(item: IMyFund) {
  const nowDateTime = new Date().getTime();
  const applyDateTime = new Date(item.applyDate).getTime();
  return Math.floor((nowDateTime - applyDateTime) / (1000 * 3600 * 24));
}

function getDiscountFee(cur: IFund, holdDays: number) {
  return resolveOuterSellFeeById(cur.fundId, holdDays) + innerBuyFeeRt;
}

function getOverFee(cur: IFund) {
  const applyFee = parseFloat(cur.applyFee);
  const discountedApplyFee = (Number.isNaN(applyFee) ? 0 : applyFee) * outerBuyDiscount;
  return innerSellFeeRt + discountedApplyFee;
}
