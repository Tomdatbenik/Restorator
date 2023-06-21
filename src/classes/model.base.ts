import { MapItem } from "./../interfaces/mapItem.interface";
import { ModelMeta } from "./../interfaces/modelMeta.interface";
export class Model {
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

    this._meta._mapTo.forEach((item) => {
      body[item.target] = (this as any)[item.source];
    });

    return JSON.stringify(body);
  }
}
