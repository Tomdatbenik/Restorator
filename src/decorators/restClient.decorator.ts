export function RestClient(baseUrl: string) {
  return function <T extends { new (...args: any[]): {} }>(constructor: T) {
    const cls = class extends constructor {
      _baseUrl = baseUrl;

      get baseUrl() {
        return this._baseUrl;
      }
    };
    return cls;
  };
}
