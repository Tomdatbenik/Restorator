import { Exclude, Model } from "../src";

describe("exclude", () => {
  class ExcludeModel extends Model {
    private intact = "intact";

    @Exclude()
    private removed = "removed";
  }

  it("should not exist on model after parsing", () => {
    const model = new ExcludeModel();

    const result = model.toJson();

    expect(result).toEqual(JSON.stringify({ intact: "intact" }));
  });

  it("should not exist on model after parsing", () => {
    const model = new ExcludeModel();

    const result = model.parse();

    expect(result).toEqual({ intact: "intact" });
  });
});
