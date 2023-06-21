import { IModel } from "..";
import { MapItem } from "./../interfaces/mapItem.interface";
import { ModelMeta } from "./../interfaces/modelMeta.interface";
export class Model implements IModel {
  private get _meta(): Partial<ModelMeta> {
    return {
      _creatable: Reflect.get(this, "_creatable") as boolean,
      _deletable: Reflect.get(this, "_deletable") as boolean,
      _mapTo: Reflect.get(this, "_mapTo") as MapItem[],
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

  public toJson() {
    if (this._meta._mapTo == null) {
      return JSON.stringify(this);
    }

    const body: any = {};
    this._meta._mapTo.reverse().forEach((item) => {
      body[item.target] = (this as any)[item.source];
    });

    return JSON.stringify(body);
  }

  public parse<T>(): T {
    if (this._meta._mapTo == null) {
      return this as unknown as T;
    }

    const body: Partial<T> = new Model() as any;
    
    this._meta._mapTo.reverse().forEach((item) => {
      (body as any)[item.target] = (this as any)[item.source];
    });

    return body as unknown as T;
  }
}
