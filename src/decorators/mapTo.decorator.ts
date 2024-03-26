import { Model } from "..";
import { SetMapToMeta } from "../functions/setMapToMeta.function";

export function MapTo(target: string) {
  return function (
    _: any,
    context: ClassFieldDecoratorContext | ClassGetterDecoratorContext
  ) {
    context.addInitializer(function () {
      SetMapToMeta(this as Model, {
        source: String(context.name),
        target: target,
      });
    });
  };
}
