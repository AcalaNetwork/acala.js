# 🌊 Acala.js

[![License](https://img.shields.io/badge/License-Apache%202.0-blue?logo=apache&style=flat-square)](https://github.com/AcalaNetwork/acala.js/blob/master/LICENSE)
[![npm](https://img.shields.io/npm/v/@acala-network/sdk?logo=npm&style=flat-square)](https://www.npmjs.com/package/@acala-network/sdk)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue?logo=typescript&style=flat-square)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-%3E%3D22-green?logo=node.js&style=flat-square)](https://nodejs.org/)


## 📦 Packages

| Package | Description | Version |
|---------|-------------|---------|
| [`@acala-network/sdk`](./packages/sdk) | Main SDK with wallet, DeFi protocols | [![npm](https://img.shields.io/npm/v/@acala-network/sdk?style=flat-square)](https://www.npmjs.com/package/@acala-network/sdk) |
| [`@acala-network/sdk-core`](./packages/sdk-core) | Core utilities, tokens, math operations | [![npm](https://img.shields.io/npm/v/@acala-network/sdk-core?style=flat-square)](https://www.npmjs.com/package/@acala-network/sdk-core) |
| [`@acala-network/sdk-swap`](./packages/sdk-swap) | DEX trading and liquidity operations | [![npm](https://img.shields.io/npm/v/@acala-network/sdk-swap?style=flat-square)](https://www.npmjs.com/package/@acala-network/sdk-swap) |
| [`@acala-network/sdk-loan`](./packages/sdk-loan) | CDP (Collateralized Debt Position) management | [![npm](https://img.shields.io/npm/v/@acala-network/sdk-loan?style=flat-square)](https://www.npmjs.com/package/@acala-network/sdk-loan) |
| [`@acala-network/sdk-homa`](./packages/sdk-homa) | Liquid staking (LDOT/LKSM) operations | [![npm](https://img.shields.io/npm/v/@acala-network/sdk-homa?style=flat-square)](https://www.npmjs.com/package/@acala-network/sdk-homa) |
| [`@acala-network/sdk-payment`](./packages/sdk-payment) | Transaction fee management | [![npm](https://img.shields.io/npm/v/@acala-network/sdk-payment?style=flat-square)](https://www.npmjs.com/package/@acala-network/sdk-payment) |
| [`@acala-network/wormhole-portal`](./packages/wormhole-portal) | Cross-chain bridge operations | [![npm](https://img.shields.io/npm/v/@acala-network/wormhole-portal?style=flat-square)](https://www.npmjs.com/package/@acala-network/wormhole-portal) |

## 🚀 Quick Start

### Installation

```bash
# Install the main SDK
npm install @acala-network/sdk @acala-network/types @polkadot/api

# Or with yarn
yarn add @acala-network/sdk @acala-network/types @polkadot/api
```

### Basic Usage

```typescript
import { ApiPromise, WsProvider } from '@polkadot/api';
import { options } from '@acala-network/api';
import { Wallet } from '@acala-network/sdk';

// Connect to Acala network
const provider = new WsProvider('wss://acala-rpc.aca-api.network');
const api = await ApiPromise.create(options({ provider }));

// Create wallet instance
const wallet = new Wallet(api);

// Get account balance
const address = '5F98oWfz2r5rcRVnP9VCndg33DAAsky3iuoBSpaPUbgN9AJn';
const accountInfo = await wallet.queryBalance(address);
console.log('ACA Balance:', accountInfo.native.available.toString());

// Subscribe to balance changes
wallet.subscribeBalance(address, (balance) => {
  console.log('Balance updated:', balance.native.available.toString());
});
```

## 📚 Documentation

- 📖 **[SDK Documentation](./packages/sdk/README.md)** - Complete API reference
- 🏠 **[Homa Liquid Staking](./packages/sdk/docs/homa.md)** - Liquid staking guide
- 🌉 **[Cross-Chain Operations](./packages/sdk/docs/cross-chain.md)** - Bridge functionality
- 🔄 **[aUSD Bridge](./packages/sdk/docs/ausd-bridge.md)** - aUSD cross-chain transfers
- 🎨 **[NFT Operations](./packages/sdk/docs/nft.md)** - NFT minting and trading

## 🛠️ Development

### Prerequisites

- Node.js ≥ 22
- Yarn 4.x

### Setup

```bash
# Clone the repository
git clone https://github.com/AcalaNetwork/acala.js.git
cd acala.js

# Install dependencies
yarn install

# Build all packages
yarn build

# Run tests
yarn test

# Lint code
yarn lint
```

### Project Structure

```
acala.js/
├── packages/
│   ├── sdk/           # Main SDK package
│   ├── sdk-core/      # Core utilities
│   ├── sdk-swap/      # DEX operations
│   ├── sdk-loan/      # CDP management
│   ├── sdk-homa/      # Liquid staking
│   ├── sdk-payment/   # Fee management
│   └── wormhole-portal/ # Cross-chain bridge
├── docs/              # Documentation
└── examples/          # Example applications
```
