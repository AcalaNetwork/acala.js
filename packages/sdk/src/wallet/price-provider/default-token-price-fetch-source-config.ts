import { ChainType } from '../..';
import { TokenPriceFetchSource } from '../type';
import { PriceProviderType } from './types';

export const defaultTokenPriceFetchSource: TokenPriceFetchSource = {
  [ChainType.ACALA]: {
    DOT: PriceProviderType.MARKET
  },
  [ChainType.KARURA]: {
    KAR: PriceProviderType.MARKET,
    KSM: PriceProviderType.MARKET,
    BNC: PriceProviderType.MARKET
  },
  [ChainType.MANDALA]: {
    DOT: PriceProviderType.MARKET,
    KAR: PriceProviderType.MARKET,
    BNC: PriceProviderType.MARKET
  }
};
