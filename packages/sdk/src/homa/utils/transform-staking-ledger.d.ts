import { Token } from '@acala-network/sdk-core';
import { AcalaStakingLedge } from '@acala-network/types/interfaces/index';
import { StorageKey, u16, Option } from '@polkadot/types';
import { StakingLedger } from '../types.js';
export declare function transformStakingLedger(data: [StorageKey<[u16]>, Option<AcalaStakingLedge>][], stakingToken: Token): StakingLedger[];
