import { TimestampedValue } from '@orml/types/interfaces/oracle';
import { Price } from '@orml/types/interfaces/prices';

export interface DerivedRawPrice {
  asset: string;
  value: TimestampedValue;
}

export interface DerivedPrice {
  token: string;
  price: Price;
}
