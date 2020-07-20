export default {
  rpc: {},
  types: {
    HomaUnlockChunk: {
      value: 'Compact<Balance>',
      era: 'Compact<EraIndex>'
    },
    BondingLedger: {
      total: 'Compact<Balance>',
      active: 'Compact<Balance>',
      unlocking: 'Vec<UnlockChunk>'
    }
  },
  typesAlias: {
    nomineesElection: {
      UnlockChunk: 'HomaUnlockChunk'
    }
  }
};
