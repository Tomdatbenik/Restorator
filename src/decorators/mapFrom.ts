import { Model } from "..";
import { SetMapFromMeta } from "../functions/setMapFromMeta.function";

export function MapFrom(source: string) {
  return function (
    _: any,
    context: ClassFieldDecoratorContext | ClassGetterDecoratorContext
  ) {
    context.addInitializer(function () {
      SetMapFromMeta(this as Model, {
        source: source,
        target: context.name.toString(),
      });
    });
  };
}
