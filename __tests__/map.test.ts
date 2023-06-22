import { MapTuple } from "../src";
import { IModel, Exclude, Model } from "../src";
import { MapTo } from "../src";

describe("MapTo", () => {
  class MapModel extends Model {
    @MapTo("target_field")
    public test = "value";

    private leftAlone = "left alone";

    @Exclude()
    private removed = "removed";

    @MapTo("target_getter")
    private get getterTest(): string {
      return "gettertest";
    }
  }

  interface DTO extends IModel {
    leftAlone: string;
    target_field: string;
    target_getter: string;
  }

  interface DifferentType {
    target_field: string;
  }

  it("should get different json", () => {
    const model = new MapModel();

    const expected = {
      leftAlone: "left alone",
      target_field: "value",
      target_getter: "gettertest",
    };

    expect(model.toJson()).toBe(JSON.stringify(expected));
  });

  it("should get target object", () => {
    const model = new MapModel();

    const expected = {
      leftAlone: "left alone",
      target_field: "value",
      target_getter: "gettertest",
    };

    const actual = model.parse<DTO>();

    expect(actual.toJson()).toBe(JSON.stringify(expected));
    expect(actual.target_field).toBe("value");
    expect(actual.target_getter).toBe("gettertest");
    expect(actual.leftAlone).toBe("left alone");
  });

  it("should get new object from parse chain", () => {
    const model = new MapModel();

    const expected = {
      leftAlone: "left alone",
      target_field: "value",
      target_getter: "gettertest",
    };

    //Should be same object
    const actual = model.parse<DTO>();
    const parsedActual = actual.parse<DTO>();

    expect(actual).toEqual(parsedActual);

    expect(actual.target_field).toBe("value");
    expect(actual.target_getter).toBe("gettertest");
    expect(actual.leftAlone).toBe("left alone");

    parsedActual.target_field = "new value";

    expect(parsedActual.target_field).toBe("new value");
    expect(actual.target_field).toBe("value");
    expect(actual.toJson()).toBe(JSON.stringify(expected));

    expect(actual).toBeInstanceOf(Model);
    expect(parsedActual).toBeInstanceOf(Model);
  });

  it("should parse to new object", () => {
    const model = new MapModel();

    //Should be same object
    const actual = model.parse<DifferentType>();

    expect(actual.target_field).toBe("value");
    expect((actual as any).test).toBe(undefined);
  });

  it("should get new object from mapping with correct type", () => {
    const model = new MapModel();

    class NewTestClass {
      new_field?: string;
    }

    const mapping: MapTuple<MapModel, NewTestClass> = [["test", "new_field"]];

    //Should be same object
    const actual = model.parse<MapModel, NewTestClass>(mapping, NewTestClass);

    expect(actual.new_field).toBe("value");
    expect((actual as any).test).toBe(undefined);
    expect(actual).toBeInstanceOf(NewTestClass);
  });

  it("should get new object from mapping with model type", () => {
    const model = new MapModel();

    class NewTestClass {
      new_field?: string;
    }

    const mapping: MapTuple<MapModel, NewTestClass> = [["test", "new_field"]];

    //Should be same object
    const actual = model.parse<MapModel>(mapping);

    expect(actual.new_field).toBe("value");
    expect((actual as any).test).toBe(undefined);
    expect(actual).toBeInstanceOf(Model);
  });
});
