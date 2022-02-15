import { ChainType } from '../../types';
import { TokenPriceFetchSource } from '../type';
import { PriceProviderType } from './types';

export const defaultTokenPriceFetchSource: TokenPriceFetchSource = {
  [ChainType.ACALA]: {
    DOT: PriceProviderType.MARKET,
    'lc://13': PriceProviderType.ORACLE
  },
  [ChainType.KARURA]: {
    KAR: PriceProviderType.MARKET,
    KSM: PriceProviderType.MARKET,
    BNC: PriceProviderType.MARKET
  },
  [ChainType.MANDALA]: {
    DOT: PriceProviderType.MARKET,
    KAR: PriceProviderType.MARKET,
    KSM: PriceProviderType.MARKET,
    BNC: PriceProviderType.MARKET
  }
};
