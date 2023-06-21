import { Model } from "../src";
import { Bound } from "../src";

describe("Bound", () => {
  class ModelWithCreatable extends Model {
    private test = "test";

    @Bound()
    getTest() {
      return this.test;
    }
  }

  it("should be true", () => {
    const { getTest } = new ModelWithCreatable();

    expect(getTest()).toBe('test');
  });
});
