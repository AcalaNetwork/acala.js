import { ApiPromise, WsProvider } from '@polkadot/api';
import { Option, Bytes } from '@polkadot/types';
import { of } from 'rxjs';

const ENDPOINTS = ['wss://spiritnet.kilt.io/', 'wss://spiritnet.api.onfinality.io/public-ws'];

export class DIDWeb3Name {
  private api: ApiPromise;

  constructor() {
    const provider = new WsProvider(ENDPOINTS);
    this.api = new ApiPromise({ provider });
  }

  public async getName(address: string) {
    // check is connected first
    await this.api.isReady;

    const connectedDid = await this.api.query.didLookup.connectedDids<Option<any>>(address);

    if (connectedDid.isSome) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      const didAccount = (connectedDid.unwrap() as any)?.did?.toString();
      const web3name = await this.api.query.web3Names.names<Option<Bytes>>(didAccount);

      if (web3name.isSome) {
        return web3name.unwrap().toUtf8();
      }
    }

    return undefined;
  }

  public subscribeName(address: string) {
    return of(this.getName(address));
  }
}
