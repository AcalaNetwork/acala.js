import { AnyApi } from '@acala-network/sdk-core';
import { GenericExtrinsic } from '@polkadot/types';
import { SignedBlock } from '@polkadot/types/interfaces';
import { FrameSystemEventRecord } from '@polkadot/types/lookup';

export interface Extrinsic {
  raw: GenericExtrinsic;
  events: FrameSystemEventRecord[];
}

export interface ListenerBlock {
  block: SignedBlock;
  extrinsics: Extrinsic[];
  events: FrameSystemEventRecord[];
  timestamp: Date;
}

export interface EventFilterConfigs {
  events: {
    section: string;
    method: string;
  }[];
}

export interface ListenerEvent {
  raw: FrameSystemEventRecord;
  extrinsic: Extrinsic;
  blcok: ListenerBlock;
}

export interface ChainListenerConfigs {
  api: AnyApi;
  // suggest use the chain name as instance key for that the sdk can create an singteton instances
  instanceKey: string;
}
