export class NoCrossChainAdapterFound extends Error {
  constructor(name: string) {
    super();

    this.message = `Can't find ${name} adapter, please registed it first before use.`;
    this.name = 'NoCrossChainAdapterFound';
  }
}
