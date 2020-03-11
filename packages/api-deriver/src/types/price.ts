import { TimestampedValue } from "@orml/types/interfaces/oracle";
import { Codec } from "@polkadot/types/types";

export interface DerivedRawPrice {
    asset: string;
    value: TimestampedValue;
}

export interface DerivedPrice {
    asset: string;
    value: Codec;
}
