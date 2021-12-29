export default {
  rpc: {},
  types: {
    AcalaStakingLedge: {
      bonded: 'Compact<Balance>',
      unlocking: 'Vec<UnlockChunk>'
    },
    AcalaUnlockChunk: {
      value: 'Compact<Balance>',
      era: 'Compact<EraIndex>'
    }
  }
};
