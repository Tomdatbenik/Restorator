import { MapItem } from "./mapItem.interface";

export interface ModelMeta {
  _creatable?: boolean;
  _deletable?: boolean;
  _mapTo: MapItem[];
}
