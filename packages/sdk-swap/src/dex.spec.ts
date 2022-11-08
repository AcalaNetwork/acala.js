import { options } from '@acala-network/api';
import { FixedPointNumber } from '@acala-network/sdk-core';
import { ApiRx, WsProvider } from '@polkadot/api';
import { firstValueFrom } from 'rxjs';
import { Wallet, WalletConfigs } from '@acala-network/sdk/wallet';
import { AggregateDex } from './dex';
import { AcalaDex } from './dex-providers/acala';
import { NutsDex } from './dex-providers/nuts';
import { TradingGraph } from './trading-graph';

describe('dex', () => {
  let sdk: AggregateDex | undefined;

  jest.setTimeout(50000);

  const initSDK = async (configs?: Partial<WalletConfigs>, endpoint = 'wss://karura.api.onfinality.io/public-ws') => {
    if (sdk) return sdk;

    const provider = new WsProvider(endpoint);
    const api = await firstValueFrom(ApiRx.create(options({ provider })));

    await api.isReady;

    const wallet = new Wallet(api, {
      wsProvider: provider,
      ...configs
    });

    await wallet.isReady;

    return new AggregateDex({
      api,
      wallet,
      providers: [new AcalaDex({ api, wallet }), new NutsDex({ api, wallet })]
    });
  };

  test.skip('get tradable tokens shoule be ok', async () => {
    const sdk = await initSDK();

    await sdk.isReady;

    const tokens = await sdk.getTradableTokens();

    console.log(tokens.map((i) => i.symbol));
  });

  test.skip('get trading path should be ok', async () => {
    const sdk = await initSDK();

    await sdk.isReady;

    const ksm = sdk.wallet.getToken('KSM');
    const rmrk = sdk.wallet.getToken('RMRK');

    console.log(TradingGraph.pathsToString(sdk.getTradingPaths(ksm, rmrk)));
  });

  test.skip('swap should be ok', async () => {
    const sdk = await initSDK();

    await sdk.isReady;

    const ksm = sdk.wallet.getToken('KSM');
    const rmrk = sdk.wallet.getToken('RMRK');

    const result = await firstValueFrom(
      sdk.swapWithAllTradeablePath({
        path: [ksm, rmrk],
        source: 'aggregate',
        mode: 'EXACT_INPUT',
        input: new FixedPointNumber(1, ksm.decimals)
      })
    );

    result.forEach((item) => {
      console.log(item.result.input.amount.toString());
      console.log(item.result.input.token.toString());
      console.log(item.result.output.amount.toString());
      console.log(item.result.output.token.toString());
      console.log(TradingGraph.pathsToString([item.result.path]));
    });
  });
});
