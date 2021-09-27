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
