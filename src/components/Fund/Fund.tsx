import cn from 'classnames';

import styles from './Fund.less';

interface FundProps {
  className?: string;
}

// interface IFundData {
//   fund_id: '161725';
//   fund_nm: '白酒基金';
//   asset_ratio: '95.000';
//   price: '1.440';
//   price_dt: '2021-07-23';
//   increase_rt: '-2.31';
//   volume: '6531.99';
//   stock_volume: '4524.1994';
//   last_time: '15:14:03';
//   amount: 65918;
//   amount_incr: '425';
//   amount_increase_rt: '0.65';
//   fund_nav: '1.4329';
//   nav_dt: '2021-07-23';
//   estimate_value: '1.4328';
//   est_val_dt: '2021-07-23';
//   last_est_time: '15:14:03';
//   discount_rt: '0.50';
//   index_id: '399997';
//   index_nm: '中证白酒';
//   index_increase_rt: '-2.42';
//   idx_price_dt: '2021-07-23';
//   apply_fee: '1.00%';
//   apply_fee_tips: '50万以下，1.00%\n50万（含）至100万，0.50%\n100万（含）以上，每笔1000元';
//   redeem_fee: '1.5%';
//   redeem_fee_tips: '持有7日内1.5%\n持有7日至1年，0.50%\n持有1年至2年，0.25%\n持有2年以上，0';
//   apply_status: '开放';
//   redeem_status: '开放';
//   min_amt: null;
//   notes: '';
//   issuer_nm: '招商基金';
//   urls: 'http://www.cmfchina.com/main/161725/fundinfo.shtml';
//   owned: 0;
//   holded: 0;
//   apply_redeem_status: '开放/开放';
//   amount_incr_tips: '最新份额：65918万份；增长：0.65%';
//   turnover_rt: '6.86';
// }

interface IFundData {
  fundId: '161725';
  fundNm: '白酒基金';
  assetRatio: '95.000'; // ?
  price: '1.440'; // 单价
  priceDt: '2021-07-23'; // 价格日期
  increaseRt: '-2.31'; // 涨幅
  volume: '6531.99'; // 成交(万元)
  stockVolume: '4524.1994';
  lastTime: '15:14:03';
  amount: 65918; // 场内份额(万份)
  amountIncr: '425'; // 场内新增
  amountIncreaseRt: '0.65'; // 场内新增率
  fundNav: '1.4329'; // 基金净值
  navDt: '2021-07-23'; // 净值日期
  estimateValue: '1.4328'; // 实时估值
  estValDt: '2021-07-23'; // 估值日期
  lastEstTime: '15:14:03'; // 最新估值时间
  discountRt: '0.50'; // 溢价率
  indexId: '399997'; // 跟踪指数id
  indexNm: '中证白酒'; // 跟踪指数
  indexIncreaseRt: '-2.42'; // 指数涨幅
  idxPriceDt: '2021-07-23'; // 指数涨幅日期
  applyFee: '1.00%'; // 申购费
  applyFeeTips: '50万以下，1.00%\n50万（含）至100万，0.50%\n100万（含）以上，每笔1000元';
  redeemFee: '1.5%'; // 赎回费
  redeemFeeTips: '持有7日内1.5%\n持有7日至1年，0.50%\n持有1年至2年，0.25%\n持有2年以上，0';
  applyStatus: '开放'; // 申购状态
  redeemStatus: '开放'; // 赎回状态
  minAmt: null;
  issuerNm: '招商基金'; // 基金公司
  urls: 'http://www.cmfchina.com/main/161725/fundinfo.shtml'; // 指数地址
  applyRedeemStatus: '开放/开放'; // 申赎状态
  amountIncrTips: '最新份额：65918万份；增长：0.65%'; // 场内份额，增长份额提示
  turnoverRt: '6.86'; // 换手率
}

export function Fund(props: FundProps) {
  const { className } = props;

  return <div className={cn(styles.Fund, className)}>Fund</div>;
}
