import { MapToTuple, MapTuple } from "@/interfaces/mapTuple.interface";
import { Model } from "..";

export function mapToMapping<T, Y>(
  model: Model,
  mapping: MapTuple<T, Y>,
  type?: Y
): Y {
  let body: Partial<T> = new Model() as any;

  if (type) {
    body = new (type as any)();
  }

  mapping.forEach((item) => {
    (body as any)[item[1]] = (model as any)[item[0]];
    delete (body as any)[item[0]];
  });

  return body as unknown as Y;
}
