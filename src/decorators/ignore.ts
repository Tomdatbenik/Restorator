import { Model } from "..";
import { setIgnoreMeta } from "../functions/setIgnoreMeta.function";

export function Ignore() {
  return function (
    originalMethod: any,
    context: ClassFieldDecoratorContext | ClassGetterDecoratorContext
  ) {
    context.addInitializer(function () {
      setIgnoreMeta(this as Model, context.name.toString());
    });
  };
}
