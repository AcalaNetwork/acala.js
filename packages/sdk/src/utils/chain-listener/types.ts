import { AnyApi } from '@acala-network/sdk-core';
import { GenericExtrinsic } from '@polkadot/types';
import { SignedBlock } from '@polkadot/types/interfaces';
import { FrameSystemEventRecord } from '@acala-network/types/lookup';

export interface Extrinsic {
  raw: GenericExtrinsic;
  events: FrameSystemEventRecord[];
}

export interface BlockDetails {
  block: SignedBlock;
  extrinsics: Extrinsic[];
  events: FrameSystemEventRecord[];
  timestamp: Date;
}

export type EventFilterConfigs = {
  section: string;
  method: string;
}[];

export interface ListenerEvent {
  raw: FrameSystemEventRecord;
  extrinsic: Extrinsic;
  blcok: BlockDetails;
}

export interface ChainListenerConfigs {
  api: AnyApi;
  key?: string;
}
