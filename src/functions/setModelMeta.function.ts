import { Model } from "../classes/model.base";
import { ModelMeta } from "@/interfaces/modelMeta.interface";

export function setModelMeta(
  target: typeof Model,
  prop: keyof ModelMeta,
  value: any
) {
  Reflect.defineProperty(target.prototype, prop, { value: value });
}
