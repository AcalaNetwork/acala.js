import { ApiPromise, WsProvider } from '@polkadot/api';
import { Option, Bytes } from '@polkadot/types';
import { of } from 'rxjs';

const ENDPOINTS = ['wss://spiritnet.kilt.io/', 'wss://spiritnet.api.onfinality.io/public-ws'];

export class DIDWeb3Name {
  private api: ApiPromise;
  private cached: Record<string, string>;

  constructor() {
    this.cached = {};
  }

  private getProvider () {
    if (!this.api) {
      const provider = new WsProvider(ENDPOINTS, false);
      this.api = new ApiPromise({ provider });
    }

    return this.api;
  }

  public async getName(address: string) {
    const api = await this.getProvider();
    if (this.cached[address]) return this.cached[address];

    // check is connected first
    await api.isReady;

    const connectedDid = await api.query.didLookup.connectedDids<Option<any>>(address);

    if (connectedDid.isSome) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      const didAccount = (connectedDid.unwrap() as any)?.did?.toString();
      const web3name = await api.query.web3Names.names<Option<Bytes>>(didAccount);

      if (web3name.isSome) {
        const name = web3name.unwrap().toUtf8();

        this.cached[address] = name;

        return name;
      }
    }

    return undefined;
  }

  public subscribeName(address: string) {
    return of(this.getName(address));
  }
}
