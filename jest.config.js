module.exports = {
  moduleNameMapper: {
    '@acala-network/api-derive(.*)$': '<rootDir>/packages/api-derive/src/$1',
    '@acala-network/api(.*)$': '<rootDir>/packages/api/src/$1',
    '@acala-network/types(.*)$': '<rootDir>/packages/types/src/$1',
    '@acala-network/type-definitions(.*)$': '<rootDir>/packages/type-definitions/src/$1'
  },
  modulePathIgnorePatterns: [
    '<rootDir>/build',
    '<rootDir>/packages/api/build',
    '<rootDir>/packages/types/build',
    '<rootDir>/packages/api-derive/build',
    '<rootDir>/packages/type-definitions/build'
  ]
};
