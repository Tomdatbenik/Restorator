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

  fromJson<T extends Model>(json: string): Model;
  fromJson<T extends Model>(json: string, mapping?: MapToTuple<T>): Model;
}
