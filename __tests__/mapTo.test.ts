import { Model } from "../src";
import { MapTo } from "../src";

describe("MapTo", () => {
  class ModelWithCreatable extends Model {
    @MapTo('target_name')
    private test = "test";
  }

  it("should be true", () => {
    const getTest = new ModelWithCreatable();

    const expected = {
      target_name: 'test'
    }

    expect(getTest.toJson()).toBe(JSON.stringify(expected));
  });
});
