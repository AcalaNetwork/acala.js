export class NoTxFound extends Error {
  constructor(section: string, method: string) {
    super(`No tx found: ${section}.${method}`);
  }
}
