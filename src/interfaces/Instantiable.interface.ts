export interface Instantiable<T> {
  new (...args: any[]): T;
}
