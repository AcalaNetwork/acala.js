import { ApiPromise, WsProvider } from '@polkadot/api';
import { Option, Bytes } from '@polkadot/types';
import { of } from 'rxjs';

const ENDPOINTS = ['wss://spiritnet.kilt.io/', 'wss://spiritnet.api.onfinality.io/public-ws'];

export class DIDWeb3Name {
  private api: ApiPromise;
  private cached: Record<string, string>;

  constructor() {
    const provider = new WsProvider(ENDPOINTS, false);
    this.api = new ApiPromise({ provider });
    this.cached = {};
  }

  public async getName(address: string) {
    if (this.cached[address]) return this.cached[address];

    // check is connected first
    await this.api.isReady;

    const connectedDid = await this.api.query.didLookup.connectedDids<Option<any>>(address);

    if (connectedDid.isSome) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      const didAccount = (connectedDid.unwrap())?.did?.toString();
      const web3name = await this.api.query.web3Names.names<Option<Bytes>>(didAccount);

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
