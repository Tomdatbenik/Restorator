import {
  MapFromTuple,
  MapToTuple,
  MapTuple,
} from "./../interfaces/mapTuple.interface";
import { IModel } from "..";
import { MapItem } from "./../interfaces/mapItem.interface";
import { ModelMeta } from "./../interfaces/modelMeta.interface";
import { mapToMapping } from "../functions/mapToMapping.function";

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
      return mapToMapping<T, Y>(this, mapping as MapTuple<T, Y>, target, args);
    }

    const body: Partial<T> = new Model() as any;

    Object.keys(this).forEach((property) => {
      if (!this._meta._exclude?.includes(property)) {
        if ((this as any)[property] instanceof Model) {
          (body as any)[property] = (this as any)[property].parse();
        } else {
          (body as any)[property] = (this as any)[property];
        }
      }
    });

    if (this._meta._mapTo == null) {
      return body as unknown as T;
    }

    this._meta._mapTo.reverse().forEach((item) => {
      if ((this as any)[item.source] instanceof Model) {
        (body as any)[item.target] = (this as any)[item.source].parse();
      } else {
        (body as any)[item.target] = (this as any)[item.source];
      }

      delete (body as any)[item.source];
    });

    return body as unknown as T;
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

  public fromJson<T extends Model>(
    json: string,
    mapping?: MapFromTuple<T>
  ): any {
    console.log(this._meta._mapFrom);

    return this;
  }

  public static from(obj: any) {
    throw new Error("Method not implemented.");
  }

  //#endregion
}
