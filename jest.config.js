/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-var-requires */
const config = require('@polkadot/dev/config/jest');

module.exports = Object.assign({}, config, {
  moduleNameMapper: {
    '@acala-network/types(.*)$': '<rootDir>/packages/types/src/$1',
    '@acala-network/api(.*)$': '<rootDir>/packages/api/src/$1',
    '@acala-network/api-derive(.*)$': '<rootDir>/packages/api-derive/src/$1',
    '@acala-network/utils(.*)$': '<rootDir>/packages/utils/src/$1'
  },
  modulePathIgnorePatterns: [
    '<rootDir>/packages/api/build',
    '<rootDir>/packages/types/build',
    '<rootDir>/packages/api-derive/build',
    '<rootDir>/packages/utils/build'
  ],
  resolver: './jest.resolver.js'
});
