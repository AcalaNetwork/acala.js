export default {
  types: {
    LiquidationStrategy: {
      _enum: [
        'Auction',
        'Exchange'
      ]
    },
    OptionRate: 'Option<Rate>',
    OptionRatio: 'Option<Ratio>',
    OptionBalance: 'Option<Balance>',
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
    ChangeOptionBalance: {
      _enum: {
        NoChange: 'Null',
        NewValue: 'OptionBalance'
      }
    },
    RiskManagementParams: {
      maximumTotalDebitValue: 'Balance',
      stabilityFee: 'Option<Rate>',
      liquidationRatio: 'Option<Rate>',
      liquidationPenalty: 'Option<Rate>',
      requiredCollateralRatio: 'Option<Rate>'
    }
  }
};
