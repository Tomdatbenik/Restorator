import { setModelMeta } from "../functions/setModelMeta.function";
import { Model } from "..";

export function Creatable(desired = true) {
  return function (target: typeof Model, context: ClassDecoratorContext) {
    if (context.kind === "class") {
      return setModelMeta(target, "_creatable", desired);
    }
  };
}
