import { Deletable } from "../src";
import { Model } from "../src";
import { Creatable } from "../src";

describe("Creatable", () => {
  @Deletable()
  @Creatable()
  class ModelWithDecorators extends Model {}

 
  it("should be true", () => {
    const test = new ModelWithDecorators();
    
    expect(test.creatable).toBe(true);
    expect(test.deletable).toBe(true);
  });
});
