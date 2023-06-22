import { MapItem } from "../interfaces/mapItem.interface";
import { Model } from "../classes/model.base";

export function SetMapToMeta(
  target: Model,
  mapItem: MapItem
) {
  let currentMap = Reflect.get(target, "_mapFrom") as MapItem[];

  if(currentMap == null)
  {
    currentMap = []
  }

  currentMap.push(mapItem)

  Reflect.defineProperty(target, '_mapFrom', { value: currentMap });
}
