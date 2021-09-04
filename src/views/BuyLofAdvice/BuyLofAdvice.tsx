import { Card, Table } from 'antd';
import Big from 'big.js';
import cn from 'classnames';
import { useEffect, useState } from 'react';
import request from '../../utils/request';
import { innerBuyFeeRt, outerBuyDiscount } from '../Advice';
import { IFund } from '../Advice/types';

import styles from './BuyLofAdvice.less';

interface BuyLofAdviceProps {
  className?: string;
}

interface IBuyAdvice extends IFund {
  way: string;
}

const columns = [
  {
    title: '代码',
    dataIndex: 'fundId',
    key: 'fundId',
  },
  {
    title: '名称',
    dataIndex: 'fundNm',
    key: 'fundNm',
  },
  {
    title: '成交量',
    dataIndex: 'volume',
    key: 'volume',
  },
  {
    title: '溢价率',
    dataIndex: 'discountRt',
    key: 'discountRt',
  },
  {
    title: '买入方式',
    dataIndex: 'way',
    key: 'way',
  },
  {
    title: '费用',
    dataIndex: 'fee',
    key: 'fee',
  },
];
export function BuyLofAdvice(props: BuyLofAdviceProps) {
  const { className } = props;

  const [stocks, setStocks] = useState<IBuyAdvice[]>([]);
  const [indexes, setIndexes] = useState<IBuyAdvice[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const requestStock = request.get('/lof-fund/stock');
    const requestIndex = request.get('/lof-fund/index');
    setLoading(true);
    Promise.all([requestIndex, requestStock])
      .then(([indexList, stockList]) => {
        stockList.sort((a: IFund, b: IFund) => parseFloat(b.volume) - parseFloat(a.volume));
        indexList.sort((a: IFund, b: IFund) => parseFloat(b.volume) - parseFloat(a.volume));

        setStocks(
          stockList.map((s: IFund) => {
            const [way, fee] = getBuyWay(s);
            return {
              ...s,
              way,
              fee,
            };
          }),
        );
        setIndexes(
          indexList.map((s: IFund) => {
            const [way, fee] = getBuyWay(s);
            return {
              ...s,
              way,
              fee,
            };
          }),
        );
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className={cn(styles.BuyLofAdvice, className)}>
      <Card title="股票LOF">
        <Table columns={columns} dataSource={stocks} loading={loading} />
      </Card>
      <Card title="指数LOF">
        <Table columns={columns} dataSource={indexes} loading={loading} />
      </Card>
    </div>
  );
}
function getBuyWay(s: IFund) {
  const innerBuyFee = new Big(innerBuyFeeRt);
  if (s.applyStatus === '开放') {
    console.log(s.applyFee, innerBuyFeeRt, outerBuyDiscount); // ccc-log
    const applyFee = new Big(parseFloat(s.applyFee)).times(new Big(outerBuyDiscount));

    const over = new Big(parseFloat(s.discountRt));
    if (over.add(innerBuyFee).gt(applyFee)) {
      return ['申购', s.applyFee];
    }
  }
  return ['买入', innerBuyFeeRt];
}
