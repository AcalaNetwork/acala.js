import { FixedPointNumber as FN } from '@acala-network/sdk-core';

/*
the max amount rule:

  1. if fee_free >= fee:
    A. if locked_balance === 0:
      a. if allow_death && (providers > 0 || consumers === 0), then max = free_balance 
      b. if !allow_death || !(provider > 0 || consumers === 0), then max = free_balance - ed
    B. if locked_balance < ed && locked_balance > 0, then max = available_balance - (ed - locked_balance)
    C. if locked_balance >= ed, then max = available_balance 
  2. if fee_free < fee, throw MayFailedCausedByFee
*/

export class MayFailedCausedByFee extends Error {
  constructor() {
    super();

    this.message = 'the fee token balance is less than fee, the transaction may failed.';
    this.name = 'MayFailedCausedByFee';
  }
}

interface Config {
  isDefaultFee: boolean;
  isFeeToken: boolean;
  isAllowDeath: boolean;

  providers: bigint;
  consumers: bigint;

  feeFreeBalance: FN;

  targetFreeBalance: FN;
  targetLockedBalance: FN;

  ed: FN;
  fee: FN;
}

const ZERO = FN.ZERO;

export const getMaxAvailableBalance = (config: Config): FN => {
  const {
    isDefaultFee,
    isFeeToken,
    isAllowDeath,

    providers,
    consumers,

    feeFreeBalance,

    targetFreeBalance,
    targetLockedBalance,

    ed,
    fee
  } = config;

  if ((isDefaultFee || !feeFreeBalance.isZero()) && feeFreeBalance.gte(fee)) {
    const freeBalance = isFeeToken ? targetFreeBalance.sub(fee) : targetFreeBalance;

    // if target locked balance <= 0
    if (targetLockedBalance.lte(ZERO)) {
      if (isAllowDeath && (providers > 0 || consumers === BigInt(0))) {
        return freeBalance;
      } else {
        return freeBalance.sub(ed).max(ZERO);
      }
    }
    const targetAvailableBalance = freeBalance.sub(targetLockedBalance);

    // if 0 < target locked balance < ed
    if (targetLockedBalance.lt(ed) && targetLockedBalance.gt(ZERO)) return targetAvailableBalance.sub(ed).max(ZERO);

    // if target locked balance >= ed
    if (targetLockedBalance.gte(ed)) return targetAvailableBalance.max(ZERO);
  }

  throw new MayFailedCausedByFee();
};
