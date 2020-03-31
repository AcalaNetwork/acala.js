export default {
    types: {
        HumaUnlockChunk: {
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
        UnlockChunk: 'HumaUnlockChunk'
    }
}