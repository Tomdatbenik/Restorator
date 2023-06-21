import { IModel, Model } from "../src";
import { MapTo } from "../src";

describe("MapTo", () => {
  class ModelWithCreatable extends Model {
    @MapTo("target_field")
    private test = "test";

    @MapTo("target_getter")
    private get getterTest(): string {
      return "gettertest";
    }
  }

  interface DTO extends IModel {
    target_field: string;
    target_getter: string;
  }

  it("should get different json", () => {
    const model = new ModelWithCreatable();

    const expected = {
      target_field: "test",
      target_getter: "gettertest",
    };

    expect(model.toJson()).toBe(JSON.stringify(expected));
  });

  it("should get target object", () => {
    const model = new ModelWithCreatable();

    const expected = {
      target_field: "test",
      target_getter: "gettertest",
    };

    const actual = model.parse<DTO>();

    expect(actual.toJson()).toBe(JSON.stringify(expected));
    expect(actual.target_field).toBe("test");
    expect(actual.target_getter).toBe("gettertest");
  });
});
