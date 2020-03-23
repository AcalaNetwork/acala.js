![license](https://img.shields.io/badge/License-Apache%202.0-blue?logo=apache&style=flat-square)
[![npm](https://img.shields.io/npm/v/@acala-network/api?logo=npm&style=flat-square)](https://www.npmjs.com/package/@acala-network/api)

# @acala-network

This library provides additional typing information for user to access Acala Network by using [polkadot.js](https://github.com/polkadot-js/api).

# Getting Started

- Install dependencies

```bash
yarn add @acala-network/api
```

- Create API instance

```ts
import { ApiPromise } from '@polkadot/api';
import { WsProvider } from '@polkadot/rpc-provider';
import { options } from '@acala-network/api';

const provider = new WsProvider('ws://localhost:994');
const api = await ApiPromise(options({ provider }));
```

- Use api to interact with node

```ts
// query account nonce
const { nonce } = await api.query.system.account(address);
```
