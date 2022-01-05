export class NoQueryPath extends Error {
  constructor(path: string) {
    super();

    this.name = 'NoQueryPath';
    this.message = `can't find the query path of ${path}`;
  }
}
