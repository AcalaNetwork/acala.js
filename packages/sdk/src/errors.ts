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
