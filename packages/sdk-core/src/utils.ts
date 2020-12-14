const NAMESPACE = 'acala sdk';

export function assert(condition: boolean, message: string, namespace = NAMESPACE) {
  if (!condition) {
    throw new Error(`${namespace}: ${message}`);
  }
}

export function warn (message: string, namespace = NAMESPACE) {
  console.warn(`${namespace}: ${message}`);
}

export function error (message: string, namespace = NAMESPACE) {
  console.error(`${namespace}: ${message}`);
}
