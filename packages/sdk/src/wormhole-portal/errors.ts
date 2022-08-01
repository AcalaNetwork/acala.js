export class ETHProviderNotFound extends Error {
  constructor(name: string) {
    super();
    this.name = 'ETHProviderNotFound';
    this.message = `can't found ${name} eth proivider`;
  }
}

export class SubstractAPINotFound extends Error {
  constructor(name: string) {
    super();
    this.name = 'SubstractAPINotFound';
    this.message = `can't found ${name} substract api`;
  }
}

export class NotSupportChain extends Error {
  constructor(name: string) {
    super();
    this.name = 'NotSupportChain';
    this.message = `the sdk don't support ${name} chain currently`;
  }
}

export class NotSupportToken extends Error {
  constructor(name: string) {
    super();
    this.name = 'NotSupportToken';
    this.message = `the sdk don't support ${name} token currently`;
  }
}

export class NeedBindEVMAddress extends Error {
  constructor(address: string) {
    super();
    this.name = 'NeedBindEVMAddress';
    this.message = `need bind an EVM address to ${address} first before use the SDK`;
  }
}

export class CreateEVMTransactionFailed extends Error {
  constructor(message: string) {
    super();
    this.name = 'CreateEVMTransactionFailed';
    this.message = `create evm transaction failed, ${message}`;
  }
}

export class QueryTxReceiptFailed extends Error {
  constructor(hash: string) {
    super();
    this.name = 'QueryTxReceiptFailed';
    this.message = `query ${hash} receipt failed, please retry later.`;
  }
}
