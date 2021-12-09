import { FixedPointNumber as FN } from '@acala-network/sdk-core';
import { EXISTENTIAL_DEPOSIT } from '../configs';

const normalizeNetwokrName = (name: string) => name.toLowerCase();
const normalizeCurrencyName = (name: string) => name.toUpperCase();

// get ed config, return 0 if the config doesn't set.
export const getExistentialDepositConfig = (network: string, currency: string): FN => {
  const config = EXISTENTIAL_DEPOSIT?.[normalizeNetwokrName(network)] || EXISTENTIAL_DEPOSIT.dev;

  return config?.[normalizeCurrencyName(currency)].clone() || FN.ZERO.clone();
};
