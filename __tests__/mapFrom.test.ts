import { Model, MapFrom } from "../src/index";

describe("mapFrom", () => {
  class MapFromModel extends Model {
    @MapFrom("source_field")
    public test: undefined | string;

    public leftAlone = "left alone";
  }

  describe("fromJson", () => {
    it("should map from json", () => {
      const model = new MapFromModel();

      const json = JSON.stringify({
        source_field: "value",
      });

      const actual = model.fromJson<MapFromModel>(json);

      expect(actual.leftAlone).toBe("left alone");
      expect(actual.test).toBe("value");
    });
  });
});
