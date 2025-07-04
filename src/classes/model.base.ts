import {
  MapFromTuple,
  MapToTuple,
  MapTuple,
} from "./../interfaces/mapTuple.interface";
import { IModel } from "..";
import { MapItem } from "./../interfaces/mapItem.interface";
import { ModelMeta } from "./../interfaces/modelMeta.interface";
import { mapToMapping } from "../functions/mapToMapping.function";
import { unifiedMapping } from "../functions/unifiedMapping.function";

export class Model implements IModel {
  private get _meta(): Partial<ModelMeta> {
    return {
      _creatable: Reflect.get(this, "_creatable") as boolean,
      _deletable: Reflect.get(this, "_deletable") as boolean,
      _mapTo: Reflect.get(this, "_mapTo") as MapItem[],
      _mapFrom: Reflect.get(this, "_mapFrom") as MapItem[],
      _exclude: Reflect.get(this, "_exclude") as string[],
    };
  }

  public get creatable(): boolean {
    if (this._meta._creatable == null) {
      return false;
    } else {
      return this._meta?._creatable;
    }
  }

  public get deletable(): boolean {
    if (this._meta._deletable == null) {
      return false;
    } else {
      return this._meta?._deletable;
    }
  }

  //#region MapTo
  public toJson(): string;
  public toJson<T>(mapping?: MapToTuple<T>): string;

  public toJson<T>(mapping?: MapToTuple<T>): string {
    if (mapping) {
      return JSON.stringify(this.parse<T>(mapping));
    }

    return JSON.stringify(this.parse());
  }

  //TODO create mapping for mapTo and mapFrom so one function does the mapping and creating of new object

  public parse(): any;
  public parse<T>(): T;
  public parse<T, Y>(
    mapping: MapTuple<T, Y>,
    target: { new (...args: any[]): Y },
    ...args: any[]
  ): Y;
  public parse<T>(mapping: MapToTuple<T>): any;

  public parse<T, Y>(
    mapping?: MapToTuple<T> | MapTuple<T, Y>,
    target?: Y,
    ...args: any[]
  ): Y | T {
    if (mapping != null) {
      // Use unified mapping function for explicit mappings
      return unifiedMapping<T, Y>({
        source: this,
        mapping: mapping,
        targetType: target as any,
        direction: 'mapTo',
        args: args,
        excludeProperties: this._meta._exclude || []
      });
    }

    // Use unified mapping function for decorator-based mappings or no mappings
    return unifiedMapping<T, Y>({
      source: this,
      mapping: this._meta._mapTo,
      direction: 'mapTo',
      excludeProperties: this._meta._exclude || []
    });
  }
  //#endregion

  //#region mapFrom
  static fromJson<T extends Model>(
    json: string,
    mapping: MapFromTuple<T>
  ): Model {
    throw new Error("Method not implemented.");
  }

  public fromJson<T extends Model>(json: string): T;
  public fromJson<T extends Model>(
    json: string,
    mapping: MapFromTuple<T>
  ): T;

  public fromJson<T extends Model>(json: string): T;
  public fromJson<T extends Model>(
    json: string,
    mapping: MapFromTuple<T>
  ): T;

  public fromJson<T extends Model>(
    json: string,
    mapping?: MapFromTuple<T>
  ): any {
    const data = JSON.parse(json);
    
    // Use unified mapping function for fromJson
    const result = unifiedMapping<any, T>({
      source: data,
      mapping: mapping || this._meta._mapFrom,
      direction: 'mapFrom',
      targetType: this.constructor as any,
      excludeProperties: this._meta._exclude || []
    });
    
    return result;
  }

  public static from(obj: any) {
    throw new Error("Method not implemented.");
  }

  //#endregion
}
