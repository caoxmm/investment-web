import { RateResolveToken, ETokenType, IRateResolveToken } from './rateResolveToken';

export interface IEnumerator<T> {
  reset: () => void;
  moveNext: () => boolean;
  readonly current: T;
}

export interface IRateResolveTokenizer extends IEnumerator<IRateResolveToken> {
  setSource: (source: string) => void;
  // createIRateResolveToken(): IRateResolveToken;
  // reset(): void;
  // getNextToken(token: IRateResolveToken): boolean;
}

export class RateResolveTokenizer implements IRateResolveTokenizer {
  private _digits: string[] = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '%'];
  private _whiteSpaces: string[] = [' ', '\t', '\v', '\n', '\r', '\r\n'];

  private _source = ' RateResolveTokenizer ';
  private _currIdx = 0;
  private _current: IRateResolveToken = new RateResolveToken();

  public moveNext(): boolean {
    this._current = new RateResolveToken();
    return this._getNextToken(this._current);
  }

  public get current(): IRateResolveToken {
    return this._current;
  }

  public createIRateResolveToken(): IRateResolveToken {
    return new RateResolveToken();
  }

  public setSource(source: string): void {
    this._source = source;
    this._currIdx = 0;
  }

  public reset(): void {
    this._currIdx = 0;
  }

  private _getNextToken(tok: IRateResolveToken): boolean {
    const token: RateResolveToken = tok as RateResolveToken;

    let c = '';

    do {
      c = this._skipWhitespace();
      if (this._isDigit(c) || c === '-' || (c === '.' && this._isDigit(this._peekChar()))) {
        this._ungetChar();
        this._getNumberString(token);
        return true;
      } else if (c.length > 0) {
        this._ungetChar();
        this._getString(token);
        return true;
      }
    } while (c.length > 0);

    return false;
  }

  private _skipWhitespace(): string {
    let c = '';
    do {
      c = this._getChar();
    } while (c.length > 0 && this._isWhiteSpace(c));
    return c;
  }

  private _getNumberString(token: RateResolveToken): void {
    let c: string = this._peekChar();
    token.setType(ETokenType.NUMBER_STRING);
    do {
      this._getChar();
      token.addChar(c);
      if (this._isDigit(c)) {
        c = this._peekChar();
      }
    } while (c.length > 0 && !this._isWhiteSpace(c) && this._isDigit(c));
  }

  private _getString(token: RateResolveToken): void {
    let c: string = this._peekChar();
    token.setType(ETokenType.STRING);
    do {
      this._getChar();
      token.addChar(c);
      if (!this._isSpecialChar(c) && !this._isDigit(c)) {
        c = this._peekChar();
      }
    } while (c.length > 0 && !this._isWhiteSpace(c) && !this._isSpecialChar(c) && !this._isDigit(c));
  }

  private _isSpecialChar(c: string): boolean {
    switch (c) {
      case '(':
        return true;
      case ')':
        return true;
      case '[':
        return true;
      case ']':
        return true;
      case '{':
        return true;
      case '}':
        return true;
      case ',':
        return true;
      case '，':
        return true;
      case '.':
        return true;
    }
    return false;
  }

  private _isDigit(c: string): boolean {
    for (const digit of this._digits) {
      if (c === digit) {
        return true;
      }
    }
    return false;
  }

  private _isWhiteSpace(c: string): boolean {
    for (const s of this._whiteSpaces) {
      if (c === s) {
        return true;
      }
    }

    return false;
  }

  // get current index char, and add one, move to next position
  private _getChar(): string {
    if (this._currIdx >= 0 && this._currIdx < this._source.length) {
      return this._source.charAt(this._currIdx++);
    }
    return '';
  }

  // peek next char
  private _peekChar(): string {
    if (this._currIdx >= 0 && this._currIdx < this._source.length) {
      return this._source.charAt(this._currIdx);
    }
    return '';
  }

  private _ungetChar(): void {
    if (this._currIdx > 0) {
      --this._currIdx;
    }
  }
}
