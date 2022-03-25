import { AnyApi, Token } from '@acala-network/sdk-core';
import { BalanceData } from '../../wallet/type';
import { Wallet } from '@acala-network/sdk/wallet';
import { ApiTypes } from '@polkadot/api/types';
import { Observable } from 'rxjs';
import { chains } from '../configs/chains';
import { Chain, CrossChainRouter, CrossChainAdapter, CrossChainTransferEnv, CrossChainTransferParams } from '../types';

export class AcalaAdaptor<T extends ApiTypes> implements CrossChainAdapter<T> {
  readonly chain: Chain;
  readonly routers: Omit<CrossChainRouter, 'from'>[];
  private wallet: Wallet;
  private api: AnyApi;

  constructor(api: AnyApi, wallet: Wallet) {
    this.chain = chains.acala;
    this.routers = [
      { to: chains.kusama, token: 'KSM' },
      { to: chains.bifrost, token: 'KSM' },
      { to: chains.bifrost, token: 'KAR' },
      { to: chains.bifrost, token: 'KUSD' },
      { to: chains.bifrost, token: 'BNC' },
      { to: chains.bifrost, token: 'VSKSM' },
      { to: chains.statemine, token: 'RMRK' },
      { to: chains.statemine, token: 'ARIS' },
      { to: chains.quartz, token: 'QTZ'},
      { to: chains.kintsugi, token: 'KINT' }
    ];
    this.wallet = wallet;
  }

  public subscribeEnv = (params: CrossChainTransferParams): Observable<CrossChainTransferEnv> {
    // this.subscribeBalance(token, )
  };

  public subscribeBalance = (token: Token, address: string): Observable<BalanceData> {
    return this.wallet.subscribeBalance(token, address);
  }
}
