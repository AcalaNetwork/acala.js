import { FixedPointNumber } from '@acala-network/sdk-core';

const MAX = FixedPointNumber.fromInner('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff');
const ZERO = FixedPointNumber.ZERO;

type ExistentialDepositConfig = {
  [chain in string]: { [token in string]: FixedPointNumber };
};

/**
 * existentialDeposit is maintenance manual, please ensure the config is match the current;
 */
const EXISTENTIAL_DEPOSIT: ExistentialDepositConfig = {
  acala: {
    KAR: ZERO,
    KUSD: ZERO,
    KSM: ZERO,
    LKSM: ZERO,
    ACA: ZERO,
    AUSD: ZERO,
    DOT: ZERO,
    LDOT: ZERO,
    RENBTC: ZERO,
    CASH: ZERO
  },
  karura: {
    KAR: new FixedPointNumber(0.1, 12),
    KUSD: new FixedPointNumber(0.01, 12),
    KSM: new FixedPointNumber(10 * 0.00001, 12),
    LKSM: new FixedPointNumber(50 * 0.00001, 12),
    ACA: MAX,
    AUSD: MAX,
    DOT: MAX,
    LDOT: MAX,
    RENBTC: MAX,
    CASH: MAX
  }
};

export const getExistentialDeposit = (network: string, currency: string): FixedPointNumber | undefined => {
  return EXISTENTIAL_DEPOSIT?.[network.toLocaleLowerCase()]?.[currency.toUpperCase()].clone();
};
