export default {
  rpc: {},
  types: {
    NomineeId: 'AccountId',
    HomaUnlockChunk: {
      value: 'Balance',
      era: 'EraIndex'
    },
    BondingLedger: {
      total: 'Balance',
      active: 'Balance',
      unlocking: 'Vec<UnlockChunk>'
    }
  },
  typesAlias: {
    nomineesElection: {
      UnlockChunk: 'HomaUnlockChunk'
    }
  }
};
