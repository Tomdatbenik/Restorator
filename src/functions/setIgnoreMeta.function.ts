import { Model } from "../classes/model.base";

export function setIgnoreMeta(
  target: Model,
  ignore: string | symbol
) {
  let currentMap = Reflect.get(target, "_ignore") as string[];

  if(currentMap == null)
  {
    currentMap = []
  }

  currentMap.push(ignore.toString())

  Reflect.defineProperty(target, '_ignore', { value: currentMap });
}
