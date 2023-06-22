import { Model } from "..";
import { MapToTuple, MapTuple } from "./mapTuple.interface";

export interface IModel {
  get creatable(): boolean;
  get deletable(): boolean;

  toJson(): string;
  toJson<T>(mapping?: MapToTuple<T>): string;

  parse<T>(): T;
  parse<T, Y>(
    mapping: MapTuple<T, Y>,
    target: { new (...args: any[]): Y },
    ...args: any[]
  ): Y;
  parse<T>(mapping: MapToTuple<T>): any;
  parse<T, Y>(
    mapping?: MapToTuple<T> | MapTuple<T, Y>,
    target?: Y,
    ...args: any[]
  ): Y | T;

  fromJson<T extends Model>(json: string): Model;
  fromJson<T extends Model>(json: string, mapping?: MapToTuple<T>): Model;
}
