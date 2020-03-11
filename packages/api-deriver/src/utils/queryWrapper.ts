import { QueryOption } from "../types/query";
import { AugmentedQuery } from "@polkadot/api/types";
import { CodecArg, Codec } from "@polkadot/types/types";
import { Observable } from "rxjs";
import { take } from "rxjs/operators";

type GenericStorageEntryFunction = (arg1?: CodecArg, arg2?: CodecArg) => Observable<Codec>

export function queryWrapper<T extends Observable<Codec>> (
  query: AugmentedQuery<'rxjs', GenericStorageEntryFunction>,
  args: any[],
  options?: QueryOption
): T {
    if (options && options.hash) {
        return query.at(options.hash, ...args).pipe(take(1)) as T;
    }
    return query(...args) as T;
}
