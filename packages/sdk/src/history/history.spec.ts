import { Wallet } from '../wallet';
import dotenv from 'dotenv';
import { WsProvider } from '@polkadot/rpc-provider';
import { ApiPromise } from '@polkadot/api';
import { options } from '@acala-network/api';
import { History } from '.';

dotenv.config();

describe('history', () => {
  let sdk: Wallet | undefined;

  jest.setTimeout(300000);

  const initSDK = async () => {
    if (sdk) return sdk;

    const endpoint = 'wss://karura-rpc-1.aca-api.network/';
    const provider = new WsProvider(endpoint);
    const api = await ApiPromise.create(options({ provider }));

    await api.isReady;

    const wallet = new Wallet(api);

    await wallet.isReady;

    return wallet;
  };

  test('get karura transfer history should be ok', async () => {
    const wallet = await initSDK();

    const history = new History({
      fetchEndpoints: {
        transfer: 'https://api.subquery.network/sq/AcalaNetwork/karura-transfer-history',
        swap: 'https://api.subquery.network/sq/AcalaNetwork/karura-dex',
        earn: 'https://api.subquery.network/sq/AcalaNetwork/karura-incentives',
        loan: 'https://api.subquery.network/sq/AcalaNetwork/karura-loan',
        homa: 'https://api.subquery.network/sq/AcalaNetwork/karura-homa'
      },
      wallet,
      poolInterval: 5 * 60 * 1000 // every 5 minutes
    });

    const transfers = await history.transfer.getHistories({
      address: 'seorgCZDzP5G3JEbsBjFdpQ4dTUgCWoPjQynyJqHCfXvZVW'
    });

    const swaps = await history.swap.getHistories({
      address: 'seorgCZDzP5G3JEbsBjFdpQ4dTUgCWoPjQynyJqHCfXvZVW'
    });

    const earns = await history.earn.getHistories({
      address: 'seorgCZDzP5G3JEbsBjFdpQ4dTUgCWoPjQynyJqHCfXvZVW'
    });

    const loans = await history.loan.getHistories({
      address: 'seorgCZDzP5G3JEbsBjFdpQ4dTUgCWoPjQynyJqHCfXvZVW'
    });

    const homas = await history.homa.getHistories({
      address: 'seorgCZDzP5G3JEbsBjFdpQ4dTUgCWoPjQynyJqHCfXvZVW'
    });

    expect(transfers.length).not.toBe(0);
    expect(swaps.length).not.toBe(0);
    expect(earns.length).not.toBe(0);
    expect(loans.length).not.toBe(0);
    expect(homas.length).not.toBe(0);
  });
});
