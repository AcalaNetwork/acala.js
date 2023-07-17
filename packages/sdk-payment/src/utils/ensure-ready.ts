import { MethodDeclaration } from 'typescript';
import { NotReady } from '../error';

export function ensureReady (
  _target: any,
  _propertyKey: string,
  descriptor: PropertyDescriptor
) {
  const origin = descriptor.value;

  descriptor.value = function (...args: any[]) {
    if (!(this as any).isReady) {
      throw new NotReady();
    }

    return origin.apply(this, args);
  }

  return descriptor;
}