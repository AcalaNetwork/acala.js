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
      unlocking: 'Vec<HomaUnlockChunk>'
    }
  },
  typesAlias: {
    nomineesElection: {
      UnlockChunk: 'HomaUnlockChunk'
    }
  }
};
