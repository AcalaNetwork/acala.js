///	The mint amount is below the threshold.
export class BelowMintThreshold extends Error {
  constructor() {
    super();

    this.name = 'BelowMintThreshold';
    this.message = 'The mint amount is below the threshold.';
  }
}

///	The redeem amount to request is below the threshold.
export class BelowRedeemThreshold extends Error {
  constructor() {
    super();

    this.name = 'BelowRedeemThreshold';
    this.message = 'The redeem amount to request is below the threshold.';
  }
}

/// The mint will cause staking currency of Homa exceed the soft cap.
export class ExceededStakingCurrencySoftCap extends Error {
  constructor() {
    super();
    this.name = 'ExceededStakingCurrencySoftCap';
    this.message = 'The mint will cause staking currency of Homa exceed the soft cap.';
  }
}

/// UnclaimedRedemption is not enough, this error is not expected.
export class InsufficientUnclaimedRedemption extends Error {
  constructor() {
    super();
    this.name = 'InsufficientUnclaimedRedemption';
    this.message = 'UnclaimedRedemption is not enough, this error is not expected.';
  }
}

/// Redeem request is not allowed to be fast matched.
export class FastMatchIsNotAllowed extends Error {
  constructor() {
    super();
    this.name = 'FastMatchIsNotAllowed';
    this.message = 'Redeem request is not allowed to be fast matched.';
  }
}
