const config = require('@open-web3/dev-config/config/jest.cjs');

module.exports = Object.assign({}, config, {
  moduleNameMapper: {
    '@acala-network/sdk-core(.*)$': '<rootDir>/packages/sdk-core/src/$1',
    '@acala-network/sdk-swap(.*)$': '<rootDir>/packages/sdk-swap/src/$1',
    '@acala-network/sdk/(.*)$': '<rootDir>/packages/sdk/src/$1',
    '@acala-network/sdk-payment(.*)$': '<rootDir>/packages/sdk-payment/$1',
    '@acala-network/wormhole-portal(.*)$': '<rootDir>/packages/wormhole-portal/$1'
  },
  modulePathIgnorePatterns: [
    '<rootDir>/build',
    '<rootDir>/packages/sdk-core/build',
    '<rootDir>/packages/sdk-swap/build',
    '<rootDir>/packages/sdk-payment/build',
    '<rootDir>/packages/sdk/build',
    '<rootDir>/packages/sdk-wallet/build',
    '<rootDir>/packages/sdk-homa/build',
    '<rootDir>/packages/sdk-loan/build',
    '<rootDir>/packages/app-util/build',
    '<rootDir>/packages/wormhole-portal/build'
  ],
  transformIgnorePatterns: ['/node_modules/(?!@polkadot|@babel/runtime/helpers/esm/)']
});
