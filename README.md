![license](https://img.shields.io/badge/License-Apache%202.0-blue?logo=apache&style=flat-square)
[![npm](https://img.shields.io/npm/v/@acala-network/api?logo=npm&style=flat-square)](https://www.npmjs.com/package/@acala-network/api)

# @acala-network

This library provides additional typing information for user to access Acala Network by using [polkadot.js](https://github.com/polkadot-js/api).

# Getting Started

- Install dependencies

```bash
yarn add @polkadot/api @acala-network/api@beta
```

- Create API instance

```ts
import { ApiPromise } from '@polkadot/api';
import { WsProvider } from '@polkadot/rpc-provider';
import { options } from '@acala-network/api';

async function main() {
    const provider = new WsProvider('wss://testnet-node-1.acala.laminar.one/ws');
    const api = new ApiPromise(options({ provider }));
    await api.isReady;

    // use api
}

main()
```

- Use api to interact with node

```ts
// query and display account data
const data = await api.query.system.account('5F98oWfz2r5rcRVnP9VCndg33DAAsky3iuoBSpaPUbgN9AJn');
console.log(data.toHuman())
```

# Packages

- [api](./packages/api)
  - Contains necessary options to create a polkadot.js API instance
- [api-derive](./packages/api-derive)
  - Additional derives for Acala Network
- [api-util](./packages/api-util)
  - Utilities to work with Acala Network
- [types](./packages/types)
  - Acala Network type definations
