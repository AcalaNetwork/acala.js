import { DefinitionRpcExt, DefinitionRpcSub } from '@polkadot/types/types';
import ormlJSONRpc from '@orml/types/interfaces/jsonrpc';
import * as definitions from './definitions';

const jsonrpc: Record<string, Record<string, DefinitionRpcExt>> = { ...ormlJSONRpc };

Object.keys(definitions)
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  .filter(key => Object.keys((definitions as any)[key as 'babe'].rpc || {}).length !== 0)
  .forEach((section): void => {
    jsonrpc[section] = jsonrpc[section] || {};

    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    Object.entries((definitions as any)[section as 'babe'].rpc).forEach(([method, def]): void => {
      const isSubscription = !!(def as DefinitionRpcSub).pubsub;

      /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
      jsonrpc[section][method] = { ...(def as any), isSubscription, jsonrpc: `${section}_${method}`, method, section };
    });
  });

export default jsonrpc;
