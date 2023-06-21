export interface IModel {
  get creatable(): boolean;
  get deletable(): boolean;

  toJson(): string;
  parse<T>(): T;
}
