export default {
  rpc: {},
  types: {
    LiquidationStrategy: {
      _enum: ['Auction', 'Exchange']
    },
    OptionRate: 'Option<Rate>',
    OptionRatio: 'Option<Ratio>',
    ChangeOptionRate: {
      _enum: {
        NoChange: 'Null',
        NewValue: 'OptionRate'
      }
    },
    ChangeOptionRatio: {
      _enum: {
        NoChange: 'Null',
        NewValue: 'OptionRatio'
      }
    },
    ChangeBalance: {
      _enum: {
        NoChange: 'Null',
        NewValue: 'Balance'
      }
    },
    RiskManagementParams: {
      maximumTotalDebitValue: 'Balance',
      interestRatePerSec: 'Option<Rate>',
      liquidationRatio: 'Option<Rate>',
      liquidationPenalty: 'Option<Rate>',
      requiredCollateralRatio: 'Option<Rate>'
    }
  }
};
