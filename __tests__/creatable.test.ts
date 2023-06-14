import { Deletable } from "../src";
import { Model } from "../src";
import { Creatable } from "../src";

describe("Creatable", () => {
  @Deletable()
  @Creatable()
  class ModelWithCreatable extends Model {}

  class ModelWithoutCreatable extends Model {}

  it("should be true", () => {
    const test = new ModelWithCreatable();
    
    console.log(test);

    expect(test.creatable).toBe(true);
    expect(test.deletable).toBe(true);
  });

  it("should be false", () => {
    const test = new ModelWithoutCreatable();

    expect(test.creatable).toBe(false);
  });
});
