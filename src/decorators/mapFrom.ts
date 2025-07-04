import { Model } from "..";
import { SetMapFromMeta } from "../functions/setMapFromMeta.function";

export function MapFrom(target: string) {
  return function (
    _: any,
    context: ClassFieldDecoratorContext | ClassGetterDecoratorContext
  ) {
    context.addInitializer(function () {
      SetMapFromMeta(this as Model, {
        source: target,
        target: context.name.toString(),
      });
    });
  };
}
