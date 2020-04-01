import { TimestampedValue } from '@orml/types/interfaces/oracle';

export interface DerivedRawPrice {
  asset: string;
  value: TimestampedValue;
}

export interface DerivedPrice {
  token: string;
  price: TimestampedValue;
}
