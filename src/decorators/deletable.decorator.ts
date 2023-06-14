import { setModelMeta } from "../functions/setModelMeta.function";
import { Model } from "..";

export function Deletable(desired = true) {
  return function (target: typeof Model, context: ClassDecoratorContext) {
    if (context.kind === "class") {
      setModelMeta(target, "_deletable", desired);
    }
  };
}
