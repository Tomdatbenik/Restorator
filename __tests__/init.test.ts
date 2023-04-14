import { Creatable } from "../src/decorators/creatable.decorator";

describe("Creatable", () => {
  @Creatable
  class RModel {
    constructor() {}
  }

  it("should have creatable true", () => {
    const test = new RModel();

    expect((test as any)._creatable).toBe(true)
  });
});
