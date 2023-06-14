import { Model } from "../classes/model.base";
import { ModelMeta } from "@/interfaces/modelMeta.interface";

export function setModelMeta(
    target: typeof Model,
    prop: keyof ModelMeta,
    value: any
  ) {
    const meta = target.prototype._meta;
  
    return class extends target {
      _meta = { [prop]: value, ...meta};
    };
  }