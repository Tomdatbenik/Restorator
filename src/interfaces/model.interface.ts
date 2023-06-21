export interface IModel {
  get creatable(): boolean;
  get deletable(): boolean;

  toJson(): string;
  toJson<T>(mapping?: [keyof T, string][]): string;

  parse<T>(mapping?: [keyof T, string][]): T;
  parse<T>(): T;
}
