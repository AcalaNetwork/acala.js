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

    const endpoint = process.env.ENDPOINT || 'wss://karura.api.onfinality.io/public-ws';
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
        transfer: 'https://api.subquery.network/sq/AcalaNetwork/karura-transfer-history'
      },
      wallet,
      poolInterval: 5 * 60 * 1000 // every 5 minutes
    });

    const transfers = await history.transfer.getHistories({
      address: 'seorgCZDzP5G3JEbsBjFdpQ4dTUgCWoPjQynyJqHCfXvZVW'
    });

    console.log(transfers);
  });
});
