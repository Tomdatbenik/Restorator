import { IModel, Exclude, Model } from "../src";
import { MapTo } from "../src";

describe("MapTo", () => {
  class ModelWithCreatable extends Model {
    @MapTo("target_field")
    private test = "test";

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

  it("should get different json", () => {
    const model = new ModelWithCreatable();

    const expected = {
      leftAlone: "left alone",
      target_field: "test",
      target_getter: "gettertest",
    };

    expect(model.toJson()).toBe(JSON.stringify(expected));
  });

  it("should get target object", () => {
    const model = new ModelWithCreatable();

    const expected = {
      leftAlone: "left alone",
      target_field: "test",
      target_getter: "gettertest",
    };

    const actual = model.parse<DTO>();

    expect(actual.toJson()).toBe(JSON.stringify(expected));
    expect(actual.target_field).toBe("test");
    expect(actual.target_getter).toBe("gettertest");
    expect(actual.leftAlone).toBe("left alone");
  });

  it("should get new object from parse chain", () => {
    const model = new ModelWithCreatable();

    const expected = {
      leftAlone: "left alone",
      target_field: "test",
      target_getter: "gettertest",
    };

    //Should be same object
    const actual = model.parse<DTO>();
    const parsedActual = actual.parse<DTO>([['target_field', 'test']]);

    expect(actual).toEqual(parsedActual);

    expect(actual.target_field).toBe("test");
    expect(actual.target_getter).toBe("gettertest");
    expect(actual.leftAlone).toBe("left alone");

    parsedActual.target_field = 'new value'
    
    expect(parsedActual.target_field).toBe("new value");
    expect(actual.target_field).toBe("test");
    expect(actual.toJson()).toBe(JSON.stringify(expected))
  });
});
