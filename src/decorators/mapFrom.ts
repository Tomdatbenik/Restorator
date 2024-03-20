import { Model } from "..";
import { SetMapToMeta } from "../functions/setMapToMeta.function";

export function MapFrom(target: string) {
  return function (
    _: any,
    context: ClassFieldDecoratorContext | ClassGetterDecoratorContext
  ) {
    context.addInitializer(function () {
      SetMapToMeta(this as Model, {
        source: target,
        target: context.name.toString(),
      });
    });
  };
}
