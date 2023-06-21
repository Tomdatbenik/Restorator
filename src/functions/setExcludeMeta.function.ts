import { Model } from "../classes/model.base";

export function setExcludeMeta(
  target: Model,
  exclude: string | symbol
) {
  let currentMap = Reflect.get(target, "_exclude") as string[];

  if(currentMap == null)
  {
    currentMap = []
  }

  currentMap.push(exclude.toString())

  Reflect.defineProperty(target, '_exclude', { value: currentMap });
}
