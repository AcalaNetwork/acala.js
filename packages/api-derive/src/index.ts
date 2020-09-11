import { DeriveCustom } from '@polkadot/api-derive';

import * as loan from './loan';
import * as price from './price';
import * as dex from './dex';
import * as homa from './homa';

export const derive: DeriveCustom = { loan, price, dex, homa };

export * from './types';
