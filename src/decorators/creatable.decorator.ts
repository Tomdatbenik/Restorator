export function Creatable<T extends { new (...args: any[]): {} }>(
  constructor: T
) {
  return class extends constructor {
    _creatable = true;
  };
}
