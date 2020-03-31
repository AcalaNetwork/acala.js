export default {
    rpc: {
        getSupplyAmount: {
            description: 'Get supply amount',
            params: [
                {
                    name: 'supplyCurrencyId',
                    type: 'CurrencyId'
                },
                {
                    name: 'targetCurrencyId',
                    type: 'CurrencyId'
                },
                {
                    name: 'targetCurrencyAmount',
                    type: 'Balance'
                },
            ],
            type: 'Balance'
        },
        getTargetAmount: {
            description: 'Get target amount',
            params: [
                {
                    name: 'supplyCurrencyId',
                    type: 'CurrencyId'
                },
                {
                    name: 'targetCurrencyId',
                    type: 'CurrencyId'
                },
                {
                    name: 'supplyCurrencyAmount',
                    type: 'Balance'
                },
            ],
            type: 'Balance'
        },
    },
    types: {}
};
