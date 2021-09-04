import { IRateResolveTokenizer, RateResolveTokenizer } from './rateResolveTokenizer';
export class RateResolveFactory {
  public static createRateResolveTokenizer(): IRateResolveTokenizer {
    return new RateResolveTokenizer();
  }
}
