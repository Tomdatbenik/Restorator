import { Model } from "../src";
import { Creatable } from "../src";

describe("Creatable", () => {
  @Creatable()
  class ModelWithCreatable extends Model {}

  @Creatable(false)
  class ModelWithFalseCreatable extends Model {}

  class ModelWithoutCreatable extends Model {}

  it("should be true", () => {
    const test = new ModelWithCreatable();

    expect(test.creatable).toBe(true);
  });

  it("should be false", () => {
    const test = new ModelWithFalseCreatable();

    expect(test.creatable).toBe(false);
  });

  it("should be false", () => {
    const test = new ModelWithoutCreatable();

    expect(test.creatable).toBe(false);
  });
});
