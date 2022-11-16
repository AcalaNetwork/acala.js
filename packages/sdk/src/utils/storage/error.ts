export class NoQueryPath extends Error {
  constructor(path: string) {
    super();

    this.name = 'NoQueryPath';
    this.message = `can't find the query path of ${path}`;
  }
}

export class RequiredQueryPathOrQuery extends Error {
  constructor() {
    super();

    this.name = 'NoQueryPath';
    this.message = 'storage should be setuped with query or path';
  }
}
