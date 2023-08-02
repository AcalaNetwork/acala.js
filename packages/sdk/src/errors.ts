import { Token } from '@acala-network/sdk-core';

export class MethodNotFound extends Error {
  readonly section: string;
  readonly method: string;

  constructor(section: string, method: string) {
    super();

    this.section = section;
    this.method = method;

    this.message = `can't find ${section}.${method} in api`;
    this.name = 'MethodNotFound';
  }
}

export class SDKNotReady extends Error {
  constructor(name: string) {
    super();

    this.message = `SDK ${name} is not ready`;
    this.name = 'SDKNotReady';
  }
}

export class BelowExistentialDeposit extends Error {
  constructor(address: string, token: Token) {
    super();

    this.name = 'BelowExistentialDeposit';
    this.message = `The ${address}'s ${token.display} balance may below the existential deposit after this action`;
  }
}
