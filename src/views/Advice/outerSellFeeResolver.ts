interface IFeeLevel {
  days: number;
  fee: number;
}

interface IFeeMap {
  [id: string]: IFeeLevel[];
}

const SellFeeMap: IFeeMap = {
  163417: [
    {
      days: 730,
      fee: 0,
    },
    {
      days: 365,
      fee: 0.25,
    },
    {
      days: 30,
      fee: 0.5,
    },
    {
      days: 0,
      fee: 1.5,
    },
  ],
  163415: [
    {
      days: 7,
      fee: 0.6,
    },
    {
      days: 0,
      fee: 1.5,
    },
  ],
  163406: [
    {
      days: 7,
      fee: 0.5,
    },
    {
      days: 0,
      fee: 1.5,
    },
  ],
  163402: [
    {
      days: 7,
      fee: 0.5,
    },
    {
      days: 0,
      fee: 1.5,
    },
  ],
  162703: [
    {
      days: 7,
      fee: 0.5,
    },
    {
      days: 0,
      fee: 1.5,
    },
  ],
  162605: [
    {
      days: 712,
      fee: 0,
    },
    {
      days: 365,
      fee: 0.25,
    },
    {
      days: 7,
      fee: 0.5,
    },
    {
      days: 0,
      fee: 1.5,
    },
  ],
  161903: [
    {
      days: 730,
      fee: 0,
    },
    {
      days: 365,
      fee: 0.25,
    },
    {
      days: 7,
      fee: 0.5,
    },
    {
      days: 0,
      fee: 1.5,
    },
  ],
  161028: [
    {
      days: 7,
      fee: 0.5,
    },
    {
      days: 0,
      fee: 1.5,
    },
  ],
  161005: [
    {
      days: 7,
      fee: 0.5,
    },
    {
      days: 0,
      fee: 1.5,
    },
  ],
};

export function resolveOuterSellFeeById(fundId: string, days: number) {
  const feeArr = SellFeeMap[fundId];
  if (feeArr) {
    for (const level of feeArr) {
      if (days >= level.days) {
        return level.fee;
      }
    }
  }
  return 1.5;
}
