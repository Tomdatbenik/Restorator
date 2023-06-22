import { Model } from "..";
import { MapToTuple, MapTuple } from "./mapTuple.interface";

export interface IModel {
  get creatable(): boolean;
  get deletable(): boolean;

  toJson(): string;
  toJson<T>(mapping?: MapToTuple<T>): string;


  parse<T, Y>(): Y;
  parse<T, Y>(mapping?: MapToTuple<T>): Y;
  parse<T, Y>(mapping?: MapTuple<T, Y>, target?: Y): Y;
  parse<T, Y>(mapping?: MapTuple<T, Y>, target?: { new (): Y }): Y;
  parse<T>(): T;

  fromJson<T extends Model>(json: string): Model;
  fromJson<T extends Model>(json: string, mapping?: MapToTuple<T>): Model;
}
