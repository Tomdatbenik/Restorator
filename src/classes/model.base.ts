import { IModel } from "..";
import { MapItem } from "./../interfaces/mapItem.interface";
import { ModelMeta } from "./../interfaces/modelMeta.interface";

export class Model implements IModel {
  private get _meta(): Partial<ModelMeta> {
    return {
      _creatable: Reflect.get(this, "_creatable") as boolean,
      _deletable: Reflect.get(this, "_deletable") as boolean,
      _mapTo: Reflect.get(this, "_mapTo") as MapItem[],
      _ignore: Reflect.get(this, "_ignore") as string[],
    };
  }

  get creatable(): boolean {
    if (this._meta._creatable == null) {
      return false;
    } else {
      return this._meta?._creatable;
    }
  }

  get deletable(): boolean {
    if (this._meta._deletable == null) {
      return false;
    } else {
      return this._meta?._deletable;
    }
  }

  public toJson(): string;

  public toJson<T>(mapping?: [keyof T, string][]) {
    const body: any = {};

    Object.keys(this).forEach((property) => {
      if (!this._meta._ignore?.includes(property)) {
        body[property] = (this as any)[property];
      }
    });

    if (this._meta._mapTo == null) {
      return JSON.stringify(body);
    }

    delete body["_meta"];

    this._meta._mapTo.reverse().forEach((item) => {
      body[item.target] = (this as any)[item.source];
      delete body[item.source];
    });

    return JSON.stringify(body);
  }

  
  public parse<T>(): T;

  public parse<T>(mapping?: [keyof T, string][]): T {
    const body: Partial<T> = new Model() as any;

    Object.keys(this).forEach((property) => {
      if (!this._meta._ignore?.includes(property)) {
        (body as any)[property] = (this as any)[property];
      }
    });

    if (this._meta._mapTo == null) {
      return body as unknown as T;
    }

    this._meta._mapTo.reverse().forEach((item) => {
      (body as any)[item.target] = (this as any)[item.source];
      delete (body as any)[item.source];
    });

    return body as unknown as T;
  }
}
