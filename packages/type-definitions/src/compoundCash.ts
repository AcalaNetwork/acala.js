export default {
  rpc: {},
  types: {
    CashYieldIndex: 'u128',
    GatewayNoticePayload: {
      _enum: {
        SetSupplyCap: '(CurrencyId, Balance)',
        ChangeAuthorities: 'Vec<CompoundAuthoritySignature>',
        Unlock: '(CurrencyId, Balance, AccountId)',
        SetFutureYield: '(Balance, CashYieldIndex, Moment)'
      }
    },
    GatewayNotice: {
      id: 'u64',
      payload: 'GatewayNoticePayload'
    },
    CompoundAuthoritySignature: 'AccountId'
  }
};
