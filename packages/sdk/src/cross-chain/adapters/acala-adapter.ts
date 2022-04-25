import { AnyApi, FixedPointNumber } from '@acala-network/sdk-core';
import { Wallet } from '@acala-network/sdk/wallet';
import { combineLatest, map, Observable } from 'rxjs';
import { chains, RegisteredChain } from '../configs/chains';
import { Chain, CrossChainRouter, CrossChainTransferParams } from '../types';
import { BaseCrossChainAdapter } from '../base-chain-adapter';
import { isChainEqual } from '../utils/is-chain-equal';
import { SubmittableExtrinsic } from '@polkadot/api/types';
import { TokenBalance } from '@acala-network/sdk/types';

interface AcalaAdaptorConfigs {
  api: AnyApi;
  wallet: Wallet;
}

const crossChainFeeConfigs: Record<string, string> = {
  KSM: '64000000',
  DOT: '64000000'
};

export class BaseAcalaAdaptor extends BaseCrossChainAdapter {
  private wallet: Wallet;

  constructor(configs: AcalaAdaptorConfigs, chain: Chain, routers: Omit<CrossChainRouter, 'from'>[]) {
    super(configs.api, chain, routers);
    const { wallet } = configs;

    this.wallet = wallet;
  }

  public subscribeMinInput(token: string): Observable<FixedPointNumber> {
    return this.wallet.subscribeToken(token).pipe(
      map((r) => {
        return r.ed.add(this.getCrossChainFee(token)?.balance || FixedPointNumber.ZERO);
      })
    );
  }

  public subscribeAvailableBalance(token: string, address: string): Observable<FixedPointNumber> {
    return this.wallet.subscribeBalance(token, address).pipe(map((r) => r.available));
  }

  public subscribeMaxInput(token: string, address: string, to: RegisteredChain): Observable<FixedPointNumber> {
    const { nativeToken } = this.wallet.getPresetTokens();
    return combineLatest({
      txFee: this.measureTransferFee({
        amount: FixedPointNumber.ZERO,
        to,
        token,
        address
      }),
      balance: this.wallet.subscribeBalance(token, address).pipe(map((i) => i.available))
    }).pipe(
      map(({ txFee, balance }) => {
        const feeFactor = 0.02;
        const fee = FixedPointNumber.fromInner(txFee, nativeToken.decimals || 12).mul(new FixedPointNumber(feeFactor));

        return balance.minus(fee);
      })
    );
  }

  public getCrossChainFee(token: string): TokenBalance {
    return {
      token,
      balance: FixedPointNumber.fromInner(crossChainFeeConfigs[token] ?? '0', this.wallet.__getToken(token).decimals)
    };
  }

  public getCrossChainTokenDecimals(token: string): number {
    return this.wallet.__getToken(token).decimals;
  }

  // all token's destination weight in karura/acala is same
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private getDestinationWeight(_token: string): number {
    return 5 * 1_000_000_000;
  }

  public createTx(params: CrossChainTransferParams): SubmittableExtrinsic<'rxjs'> | SubmittableExtrinsic<'promise'> {
    const { to, token, address, amount } = params;
    const tokenFormSDK = this.wallet.__getToken(token);
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
            amount: amount.toChainData()
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
        amount.toChainData(),
        { V1: dst },
        this.getDestinationWeight(token)
      );
    }

    // if destination is not statemine/kusama
    const call = this.api.tx.xTokens.transfer;

    const dst = {
      parents: 1,
      interior: {
        X2: [{ Parachain: toChain.paraChainId }, { AccountId32: { id: accountId, network: 'Any' } }]
      }
    };

    return call(tokenFormSDK.toChainData() as any, amount.toChainData(), { V1: dst }, this.getDestinationWeight(token));
  }
}

export class AcalaAdaptor extends BaseAcalaAdaptor {
  constructor(configs: AcalaAdaptorConfigs) {
    super(configs, chains.acala, [
      // polkadot
      { to: chains.polkadot, token: 'DOT' }
    ]);
  }
}

export class KaruraAdaptor extends BaseAcalaAdaptor {
  constructor(configs: AcalaAdaptorConfigs) {
    super(configs, chains.karura, [
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
  }
}
