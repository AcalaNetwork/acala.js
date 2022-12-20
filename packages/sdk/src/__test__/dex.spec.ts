import { options } from '@acala-network/api';
import { Incentive, Liquidity, Wallet } from '../index';
import { ApiPromise, WsProvider } from '@polkadot/api';
jest.setTimeout(50000);

describe('getAllIncentivePools', () => {
  test('call getAllIncentivePools in the latest block', async () => {
    const provider: any = new WsProvider('wss://karura-rpc-0.aca-api.network');
    const api: any = new ApiPromise(options({ provider }));
    await api.isReady;
    const wallet = new Wallet(api);
    await wallet.isReady;

    const ict = new Incentive({ api, wallet });
    const ips = await ict.getAllIncentivePools();

    // @ts-ignore
    ips.map((item) => {
      expect(item.rewardTokensConfig).toBeDefined();
      expect(item.savingRate).not.toBeDefined();
    });
  });
});
