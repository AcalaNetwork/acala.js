import { AnyApi, FixedPointNumber } from '@acala-network/sdk-core';
import { Wallet } from '@acala-network/sdk/wallet';
import { combineLatest, map, Observable } from 'rxjs';
import { chains } from '../configs/chains';
import { CrossChainTransferEnv, CrossChainTransferParams } from '../types';
import { BaseCrossChainAdapter } from '../base-chain-adapter';
import { isChainEqual } from '../utils/is-chain-equal';
import { SubmittableExtrinsic } from '@polkadot/api/types';

interface AcalaAdaptorConfigs {
  api: AnyApi;
  wallet: Wallet;
}

export class AcalaAdaptor extends BaseCrossChainAdapter {
  private wallet: Wallet;

  constructor(configs: AcalaAdaptorConfigs) {
    super(configs.api, chains.acala, [
      // kusama
      { to: chains.kusama, token: 'KSM' },
      // bifrost
      { to: chains.bifrost, token: 'KSM' },
      { to: chains.bifrost, token: 'KAR' },
      { to: chains.bifrost, token: 'KUSD' },
      { to: chains.bifrost, token: 'BNC' },
      { to: chains.bifrost, token: 'VSKSM' },
      // statemine
      { to: chains.statemine, token: 'RMRK' },
      { to: chains.statemine, token: 'ARIS' },
      // quartz
      { to: chains.quartz, token: 'QTZ' },
      // kintsugi
      { to: chains.kintsugi, token: 'KINT' },
      // khala
      { to: chains.khala, token: 'KAR' },
      { to: chains.khala, token: 'KUSD' },
      { to: chains.khala, token: 'PHA' }
    ]);

    const { wallet } = configs;

    this.wallet = wallet;
  }

  public subscribeMinInput(token: string): Observable<FixedPointNumber> {
    return this.wallet.subscribeToken(token).pipe(map((r) => r.ed));
  }

  public subscribeMaxInput(token: string, address: string): Observable<FixedPointNumber> {
    return this.wallet.subscribeBalance(token, address).pipe(map((r) => r.available));
  }

  // all token's destination weight in karura/acala is same
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public getDestinationWeight(_token: string): number {
    return 5 * 1_000_000_000;
  }

  public subscribeEnv(params: CrossChainTransferParams): Observable<CrossChainTransferEnv> {
    const { to, token, address } = params;
    const toAdapter = this.getAdapterByName(to);

    // subscribe destination min receive
    const minInput$ = toAdapter.subscribeMinInput(token);
    const maxInput$ = this.subscribeMaxInput(token, address);

    return combineLatest({
      minInput: minInput$,
      maxInput: maxInput$
    }).pipe(
      map(({ minInput, maxInput }) => {
        return { minInput, maxInput };
      })
    );
  }

  public createTx(params: CrossChainTransferParams): SubmittableExtrinsic<'rxjs'> | SubmittableExtrinsic<'promise'> {
    const { to, token, address, amount } = params;
    const tokenFormSDK = this.wallet.directGetToken(token);
    const accountId = this.api.createType('AccountId32', address).toHex();
    const toChain = chains[to];

    if (isChainEqual(toChain, 'statemine')) {
      const call = this.api.tx.polkadotXcm.limitedReserveTransferAssets;
      const dst = { X2: ['Parent', { ParaChain: toChain.paraChainId }] };
      const acc = { X1: { AccountId32: { id: accountId, network: 'Any' } } };
      const ass = [
        {
          ConcreteFungible: {
            id: {
              X2: [
                { PalletInstance: tokenFormSDK.locations?.palletInstance },
                { GeneralIndex: tokenFormSDK.locations?.generalIndex }
              ]
            },
            amount: new FixedPointNumber(amount, tokenFormSDK.decimal).toChainData()
          }
        }
      ];

      return call({ V0: dst }, { V0: acc }, { V0: ass }, 0, 'Unlimited');
    }

    if (isChainEqual(toChain, 'kusama') || isChainEqual(toChain, 'polkadot')) {
      const call = this.api.tx.xTokens.transfer;
      const dst = { interior: { X1: { AccountId32: { id: accountId, network: 'Any' } } }, parents: 1 };

      return call(
        tokenFormSDK.toChainData() as any,
        new FixedPointNumber(amount, tokenFormSDK.decimals).toChainData(),
        { V1: dst },
        this.getDestinationWeight(token)
      );
    }

    // if destination is not statemine
    const call = this.api.tx.xTokens.transfer;

    const dst = {
      parents: 1,
      interior: {
        X2: [{ Parachain: toChain.paraChainId }, { AccountId32: { id: accountId, network: 'Any' } }]
      }
    };

    return call(
      tokenFormSDK.toChainData() as any,
      new FixedPointNumber(amount, tokenFormSDK.decimals).toChainData(),
      { V1: dst },
      this.getDestinationWeight(token)
    );
  }
}
