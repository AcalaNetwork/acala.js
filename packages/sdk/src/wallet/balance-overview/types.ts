import { FixedPointNumber } from '@acala-network/sdk-core';
import { TokenProvider } from '@acala-network/sdk/base-provider';
import { BalanceData } from '../type';

export interface BalanceOverviewConfigs {
  tokenProvider: TokenProvider;
}

export type TokenProperty =
  // is netive token
  | 'isNativeToken'
  // is dex share token
  | 'isDexShare'
  // is collateral in loan system
  | 'isLoanCollateral'
  // is collateral in incentive
  | 'isIncentiveCollateral'
  // is staking token in homa
  | 'isHomaStakingToken'
  // is liquid token in homa
  | 'isHomaLiquidToken'
  // is vesting token in vesting module (native token)
  | 'isVestingToken';

export interface VestingData {
  total: FixedPointNumber;
  claimed: FixedPointNumber;
  remain: FixedPointNumber;
  claimable: FixedPointNumber;
}

export interface LoanData {
  locked: FixedPointNumber;
}

export interface IncentiveData {
  locked: FixedPointNumber;
}

export interface TokenBalanceOverview {
  // total amount include free & locked
  total: FixedPointNumber;
  properties: TokenProperty[];
  details: {
    // token balance information
    balances: BalanceData;
    // vesting balance data
    vesting?: VestingData;
    // loan balance data
    loan?: LoanData;
    // incentive balance data
    incentive?: IncentiveData;
  };
}
