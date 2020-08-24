import { TimestampedValue } from '@open-web3/orml-types/interfaces/oracle';
import { Option } from '@polkadot/types/codec';

export interface DerivedRawPrice {
  currency: string;
  value: TimestampedValue;
}

export interface DerivedPrice {
  currency: string;
  price: Option<TimestampedValue>;
}
