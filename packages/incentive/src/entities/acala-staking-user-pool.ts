import { ACAStakingLedger, ACAStakingUserPool } from "./types.js";
import { Observable, firstValueFrom, map } from "rxjs";
import { ApiPromise, ApiRx } from "@polkadot/api";
import { UserIncentivePoolConfig, UserIncentivePoolEntity } from "./user-pool.js";
import { AcalaPrimitivesBondingLedgerBondingLedger } from "@polkadot/types/lookup"
import { Option } from "@polkadot/types"
import { UnsubscribePromise } from "@polkadot/api/types";

type OptionLedger = Option<AcalaPrimitivesBondingLedgerBondingLedger>;

export class ACAStakingUserPoolEntity extends UserIncentivePoolEntity implements ACAStakingUserPool {
  constructor(config: UserIncentivePoolConfig) {
    super(config);
  }

  private ledgerMapper(ledger: OptionLedger): ACAStakingLedger | null {
    if (ledger.isNone) {
      return null
    }

    const unwrapped = ledger.unwrap();

    return {
      total: unwrapped.total.toBigInt(),
      active: unwrapped.active.toBigInt(),
      unlocking: unwrapped.unlocking.map((item) => ({
        amount: item.value.toBigInt(),
        at: item.unlockAt.toBigInt()
      }))
    }
  }

  public get ledger$() {
    if (this.api.type === 'promise') {
      return new Observable<ACAStakingLedger | null>((observer) => {
        let unsub = () => {};

        (this.api as ApiPromise).query.earning.ledger<OptionLedger>(this.pool.id, this.account, (result: OptionLedger) => {
          observer.next(this.ledgerMapper(result));
        }).then((unsubFn) => {
          unsub = unsubFn as unknown as () => void;
        }).catch((error) => {
          observer.error(error);
        }) as any as UnsubscribePromise;

        return () => {
          unsub && unsub();
        }
      });
    }

    if (this.api.type === 'rxjs') {
      return (this.api as ApiRx).query.earning.ledger<OptionLedger>(this.pool.id, this.account).pipe(
        map((ledger) => this.ledgerMapper(ledger))
      )
    }

    throw new Error('Unsupported API type');
  }

  public async ledger() {
    return firstValueFrom(this.ledger$);
  }
}