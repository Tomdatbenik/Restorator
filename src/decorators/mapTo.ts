import { Model } from "..";
import { SetMapToMeta } from "../functions/setMapToMeta.function";

export function MapTo(target: string) {
  return function (originalMethod: any, context: ClassFieldDecoratorContext | ClassGetterDecoratorContext) {
    context.addInitializer(function () {
      SetMapToMeta(this as Model, { source: context.name.toString(), target: target });
    });
  };
}
