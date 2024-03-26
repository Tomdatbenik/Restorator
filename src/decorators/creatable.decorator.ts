import { setModelMeta } from "../functions/setModelMeta.function";
import { Model } from "..";

export function Creatable(desired = true) {
  return function (target: typeof Model, _: ClassDecoratorContext) {
      setModelMeta(target, "_creatable", desired);
  };
}
