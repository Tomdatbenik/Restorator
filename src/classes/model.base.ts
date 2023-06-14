import { ModelMeta } from "./../interfaces/modelMeta.interface";
export class Model {
  public _meta: Partial<ModelMeta> = {};

  get creatable(): boolean {
    if (this._meta._creatable == null) {
      return false;
    } else {
      return this._meta?._creatable;
    }
  }
}
