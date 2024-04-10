import { Storage } from '@acala-network/sdk/utils/storage';
export const createStorages = (api) => {
    return {
        positions: (token, address) => {
            return Storage.create({
                api: api,
                path: 'query.loans.positions',
                params: [token.toChainData(), address]
            });
        },
        allCollateralParams: () => {
            return Storage.create({
                api: api,
                path: 'query.cdpEngine.collateralParams.entries',
                params: []
            });
        },
        globalPositions: (token) => {
            return Storage.create({
                api: api,
                path: 'query.loans.totalPositions',
                params: [token.toChainData()]
            });
        },
        exchangeRate: (token) => {
            return Storage.create({
                api: api,
                path: 'query.cdpEngine.debitExchangeRate',
                params: [token.toChainData()]
            });
        }
    };
};
