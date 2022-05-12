import { options } from '@acala-network/api';
import { ApiPromise, WsProvider } from '@polkadot/api';
import { Wallet } from '../wallet';
import { WalletConfigs } from '../wallet/type';
import { AggregateDex } from './dex';
import { AcalaDex } from './dex-provider/acala';

describe('dex', () => {
  let sdk: AggregateDex | undefined;

  jest.setTimeout(50000);

  const initSDK = async (configs?: Partial<WalletConfigs>, endpoint = 'wss://karura.api.onfinality.io/public-ws') => {
    if (sdk) return sdk;

    const provider = new WsProvider(endpoint);
    const api = await ApiPromise.create(options({ provider }));

    await api.isReady;

    const wallet = new Wallet(api, {
      wsProvider: provider,
      ...configs
    });

    await wallet.isReady;

    return new AggregateDex({
      api,
      wallet,
      providers: [new AcalaDex({ api, wallet })]
    });
  };

  test('get tradable tokens be ok', async () => {
    const sdk = await initSDK();

    await sdk.isReady;

    const tokens = await sdk.getTradableTokens();

    console.log(tokens.map((i) => i.symbol));
  });
});
