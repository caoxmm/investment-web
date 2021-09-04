export interface IMyFund {
  _id: string;
  fundId: string;
  fundNm: string;
  price: number; // 成交单价
  amount: number; // 份额
  total: number; // 总价格
  applyFee: number; // 申购费
  applyDate: Date; // 买入日期
}
