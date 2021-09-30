import { FixedPointNumber as FN } from '@acala-network/sdk-core';

/*
the max amount rule:

- if is native token:
  1. if locked_balance === 0:
    a. if allow_death && (providers > 0 || consumers === 0), then max = free_balance - fee
    b. if !allow_death || !(provider > 0 || consumers === 0), then max = free_balance - ed -fee
  2. if locked_balance < ed && locked_balance > 0, then max = free_balance - (ed - locked_balance) - fee
  3. if locked_balance >= ed, then max = free_balance - fee

- if not native token:
  1. if (native_free + native_locked) > fee:
    A. if locked_balance === 0:
      a. if allow_death && (providers > 0 || consumers === 0), then max = free_balance 
      b. if !allow_death || !(provider > 0 || consumers === 0), then max = free_balance - ed
    B. if locked_balance < ed && locked_balance > 0, then max = free_balance - (ed - locked_balance)
    C. if locked_balance >= ed, then max = free_balance 
  2. if (native_free + native_locked) <= fee, throw MayFailedCausedByFee
*/

export class MayFailedCausedByFee extends Error {
  constructor() {
    super();

    this.message = 'the native token balance is less than fee, the transaction may failed.';
    this.name = 'MayFailedCausedByFee';
  }
}

interface Config {
  isNativeToken: boolean;
  isAllowDeath: boolean;

  providers: number;
  consumers: number;

  nativeFreeBalance: FN;
  nativeLockedBalance: FN;

  targetFreeBalance: FN;
  targetLockedBalance: FN;

  ed: FN;
  fee: FN;
}

const ZERO = FN.ZERO;

export const getMaxAvailableBalance = (config: Config): FN => {
  const {
    isNativeToken,
    isAllowDeath,

    providers,
    consumers,

    nativeFreeBalance,
    nativeLockedBalance,

    targetFreeBalance,
    targetLockedBalance,

    ed,
    fee
  } = config;
  // handle native token
  if (isNativeToken) {
    // if native locked balance <= 0
    if (nativeLockedBalance.lte(ZERO)) {
      if (isAllowDeath && (providers > 0 || consumers === 0)) {
        return nativeFreeBalance.sub(fee).max(ZERO);
      } else {
        return nativeFreeBalance.sub(ed).sub(fee).max(ZERO);
      }
    }

    // if 0 < native locked balance < ed
    if (nativeLockedBalance.lt(ed) && nativeLockedBalance.gt(ZERO))
      return nativeFreeBalance.sub(ed.sub(nativeLockedBalance)).sub(fee).max(ZERO);

    // if native locked balance >= ed
    if (nativeLockedBalance.gte(ed)) return nativeFreeBalance.sub(fee).max(ZERO);
  }

  // handle non native token
  if (nativeFreeBalance.add(nativeLockedBalance).gt(fee)) {
    // if target locked balance <= 0
    if (targetLockedBalance.lte(ZERO)) {
      if (isAllowDeath && (providers > 0 || consumers === 0)) {
        return targetFreeBalance;
      } else {
        return targetFreeBalance.sub(ed).max(ZERO);
      }
    }

    // if 0 < target locked balance < ed
    if (targetLockedBalance.lt(ed) && targetLockedBalance.gt(ZERO))
      return targetFreeBalance.sub(ed.sub(targetLockedBalance)).max(ZERO);

    // if target locked balance >= ed
    if (targetLockedBalance.gte(ed)) return targetFreeBalance;
  }

  throw new MayFailedCausedByFee();
};
