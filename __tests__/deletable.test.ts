import { Deletable, Model } from "../src";

describe("Creatable", () => {
  @Deletable()
  class ModelWithCreatable extends Model {}

  @Deletable(false)
  class ModelWithFalseCreatable extends Model {}

  class ModelWithoutCreatable extends Model {}

  it("should be true", () => {
    const test = new ModelWithCreatable();

    expect(test.deletable).toBe(true);
  });

  it("should be false", () => {
    const test = new ModelWithFalseCreatable();

    expect(test.deletable).toBe(false);
  });

  it("should be false", () => {
    const test = new ModelWithoutCreatable();

    expect(test.deletable).toBe(false);
  });
});
