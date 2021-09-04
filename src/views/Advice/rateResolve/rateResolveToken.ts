export enum ETokenType {
  NONE,
  STRING,
  NUMBER,
  NUMBER_STRING,
  RATE,
  DAY_NUMBER,
}

export interface IRateResolveToken {
  reset: () => void;
  isString: (str: string) => boolean;
  readonly type: ETokenType;
  getString: () => string;
  getNumberString: () => string;
  getRateNumber: () => number;
  getDayNumber: () => number;
  getFloat: () => number;
  getInt: () => number;
}

export class RateResolveToken implements IRateResolveToken {
  private _type: ETokenType = ETokenType.NONE;
  private _charArr: string[] = [];
  private _val = 0.0;

  public constructor() {
    this.reset();
  }

  public reset(): void {
    this._type = ETokenType.NONE;
    this._charArr.length = 0;
    this._val = 0.0;
  }

  public get type(): ETokenType {
    return this._type;
  }

  public getString(): string {
    return this._charArr.join('');
  }

  public getNumberString(): string {
    return this._charArr.join('');
  }

  public getRateNumber(): number {
    const str = this.getNumberString();
    return parseFloat(str);
  }

  public getDayNumber(): number {
    const str = this.getNumberString();
    return parseFloat(str);
  }

  public getFloat(): number {
    return this._val;
  }

  public getInt(): number {
    return parseInt(this._val.toString(), 10);
  }

  public isString(str: string): boolean {
    const count: number = this._charArr.length;

    if (str.length !== count) {
      return false;
    }

    for (let i = 0; i < count; i++) {
      if (this._charArr[i] !== str[i]) {
        return false;
      }
    }
    return true;
  }

  public addChar(c: string): void {
    this._charArr.push(c);
  }

  public setVal(num: number): void {
    this._val = num;
    this._type = ETokenType.NUMBER;
  }

  public setType(type: ETokenType): void {
    this._type = type;
  }
}
