import { MapTuple } from "@/interfaces/mapTuple.interface";
import { Model } from "..";

export function mapToMapping<T, Y>(
  model: Model,
  mapping: MapTuple<T, Y>,
  type?: Y,
  args?: any[]
): Y {
  let body: Partial<T> = new Model() as any;

  if (type) {
    if (args != null) {
      body = new (type as any)(...args);
    } else {
      body = new (type as any)();
    }
  }

  mapping.forEach((item) => {
    if ((body as any)[item[0]] instanceof Model) {
      (body as any)[item[1]] = (model as any)[item[0]].parse();
    } else {
      (body as any)[item[1]] = (model as any)[item[0]];
    }

    delete (body as any)[item[0]];
  });

  return body as unknown as Y;
}
