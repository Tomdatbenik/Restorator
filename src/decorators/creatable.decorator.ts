export function Creatable<T extends { new (...args: any[]): {} }>(
  constructor: T
) {
  return class extends constructor {
    _creatable = true;

    get creatable() {
      return this._creatable;
    }
  };
}
