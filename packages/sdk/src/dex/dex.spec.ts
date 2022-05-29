import { options } from '@acala-network/api';
import { FixedPointNumber } from '@acala-network/sdk-core';
import { ApiPromise, WsProvider } from '@polkadot/api';
import { map } from 'rxjs';
import { Wallet } from '../wallet';
import { WalletConfigs } from '../wallet/type';
import { AggregateDex } from './dex';
import { AcalaDex } from './dex-providers/acala';
import { TradingGraph } from './trading-graph';

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

  test('get tradable tokens shoule be ok', async () => {
    const sdk = await initSDK();

    await sdk.isReady;

    const tokens = await sdk.getTradableTokens();

    console.log(tokens.map((i) => i.symbol));
  });

  test('get trading path should be ok', async () => {
    const sdk = await initSDK();

    await sdk.isReady;

    const ksm = sdk.wallet.__getToken('KSM');
    const rmrk = sdk.wallet.__getToken('RMRK');

    console.log(TradingGraph.pathsToString(sdk.getTradingPaths(ksm, rmrk)));
  });

  test('swap should be ok', async () => {
    const sdk = await initSDK();

    await sdk.isReady;

    const ksm = sdk.wallet.__getToken('KSM');
    const rmrk = sdk.wallet.__getToken('RMRK');

    sdk.swap({ path: [ksm, rmrk], source: 'aggregate', type: 'EXACT_INPUT', input: FixedPointNumber.ONE }).subscribe({
      next: (result) => {
        console.log(result);
      }
    });
  });
});
