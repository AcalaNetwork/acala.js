import { FixedPointNumber } from '@acala-network/sdk-core';

const MAX = FixedPointNumber.fromInner('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff');
const ZERO = FixedPointNumber.ZERO;

type ExistentialDepositConfig = {
  [chain in string]: { [token in string]: FixedPointNumber };
};

/**
 * existential deposit is maintained manually, please ensure the config is match the current;
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
    CASH: ZERO,
    BNC: ZERO,
    VSKSM: ZERO
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
    CASH: MAX,
    BNC: new FixedPointNumber(800 * 0.00001, 12),
    VSKSM: new FixedPointNumber(10 * 0.00001, 12)
  },
  dev: {
    KAR: new FixedPointNumber(0.1, 12),
    KUSD: new FixedPointNumber(0.01, 12),
    KSM: new FixedPointNumber(10 * 0.00001, 12),
    LKSM: new FixedPointNumber(50 * 0.00001, 12),
    ACA: MAX,
    AUSD: MAX,
    DOT: MAX,
    LDOT: MAX,
    RENBTC: MAX,
    CASH: MAX,
    BNC: new FixedPointNumber(800 * 0.00001, 12),
    VSKSM: new FixedPointNumber(10 * 0.00001, 12)
  }
};

// get ed config, return 0 if the config doesn't set.
export const getExistentialDepositConfig = (network: string, currency: string): FixedPointNumber => {
  // use dev config as default
  const config = EXISTENTIAL_DEPOSIT?.[network.toLocaleUpperCase()] || EXISTENTIAL_DEPOSIT.dev;

  return config?.[currency.toUpperCase()].clone() || ZERO.clone();
};
