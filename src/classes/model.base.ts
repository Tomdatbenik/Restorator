import { ModelMeta } from "./../interfaces/modelMeta.interface";
export class Model {
  public _meta: Partial<ModelMeta> = {
    _creatable: Reflect.get(this, "_creatable") as boolean,
    _deletable: Reflect.get(this, "_deletable") as boolean,
  };

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
}
