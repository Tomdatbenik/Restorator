import { Model } from "../src";
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

  it("should be true", () => {
    const getTest = new ModelWithCreatable();

    const expected = {
      target_field: "test",
      target_getter: "gettertest",
    };

    expect(getTest.toJson()).toBe(JSON.stringify(expected));
  });
});
