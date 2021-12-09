import { FixedPointNumber as FN } from '@acala-network/sdk-core';

const MAX = FN.fromInner('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff');

type ExistentialDepositConfig = {
  [chain in string]: { [token in string]: FN };
};

/**
 * existential deposit is maintained manually, please ensure the config is match the current;
 */
export const EXISTENTIAL_DEPOSIT: ExistentialDepositConfig = {
  acala: {
    KAR: MAX,
    KUSD: MAX,
    KSM: MAX,
    LKSM: MAX,
    ACA: new FN(0.1, 12),
    AUSD: new FN(0.1, 12),
    DOT: new FN(0.01, 10),
    LDOT: new FN(0.05, 10),
    RENBTC: MAX,
    CASH: MAX,
    BNC: MAX,
    VSKSM: MAX,
    PHA: MAX
  },
  karura: {
    KAR: new FN(0.1, 12),
    KUSD: new FN(0.01, 12),
    KSM: new FN(10 * 0.00001, 12),
    LKSM: new FN(50 * 0.00001, 12),
    BNC: new FN(800 * 0.00001, 12),
    VSKSM: new FN(10 * 0.00001, 12),
    PHA: new FN(4000 * 0.00001, 12),
    ACA: MAX,
    AUSD: MAX,
    DOT: MAX,
    LDOT: MAX,
    RENBTC: MAX,
    CASH: MAX
  },
  dev: {
    KAR: new FN(0.1, 12),
    KUSD: new FN(0.01, 12),
    KSM: new FN(10 * 0.00001, 12),
    LKSM: new FN(50 * 0.00001, 12),
    ACA: new FN(0.1, 12),
    AUSD: new FN(0.1, 12),
    DOT: new FN(0.01, 10),
    LDOT: new FN(0.05, 10),
    PHA: new FN(4000 * 0.00001, 12),
    RENBTC: MAX,
    CASH: MAX,
    BNC: new FN(800 * 0.00001, 12),
    VSKSM: new FN(10 * 0.00001, 12)
  }
};
