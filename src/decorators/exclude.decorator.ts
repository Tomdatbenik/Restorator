import { Model } from "..";
import { setExcludeMeta } from "../functions/setExcludeMeta.function";

export function Exclude() {
  return function (
    _: any,
    context: ClassFieldDecoratorContext | ClassGetterDecoratorContext
  ) {
    context.addInitializer(function () {
      setExcludeMeta(this as Model, context.name.toString());
    });
  };
}
