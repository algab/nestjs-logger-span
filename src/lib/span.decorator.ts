import { randomUUID } from 'crypto';

import { storage } from './async.local.storage';

export const Span = (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
  const original = descriptor.value;
  descriptor.value = function (...args: any[]) {
    return storage.run(randomUUID(), () => original.call(this, ...args));
  };
  copyMetadata(original, descriptor.value);
  return descriptor;
};

function copyMetadata(from: any, to: any) {
  const metadataKeys = Reflect.getMetadataKeys(from);
  metadataKeys.map((key) => {
    const value = Reflect.getMetadata(key, from);
    Reflect.defineMetadata(key, value, to);
  });
}
