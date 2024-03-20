import { Exclude, IModel, MapFrom, MapTo, Model } from "../src";

describe("modelMap", () => {
  class ModelMap extends Model {
    @MapFrom("source_field")
    @MapTo("target_field")
    public test = "value";

    @Exclude()
    private exclude = "excluded";

    @MapTo("targets_getter")
    private get getterTest(): string {
      return "gettertest";
    }
  }

  interface DTO extends IModel {
    exclude: string;
    target_field: string;
    targets_getter: string;
  }

  it("should chain and work", () => {
    const model = new ModelMap();

    const json = JSON.stringify({
      source_field: "value",
    });

    const fromModel = model.fromJson<ModelMap>(json);

    expect((fromModel as any).exclude).toBe("excluded");
    expect(fromModel.test).toBe("value");

    const expected = {
      target_field: "value",
      targets_getter: "gettertest",
    };

    expect(model.toJson()).toBe(JSON.stringify(expected));

    const parsed = fromModel.parse<DTO>();

    expect(parsed.exclude).toEqual(undefined);
    expect(parsed.target_field).toEqual(expected.target_field);
    expect(parsed.targets_getter).toEqual(expected.targets_getter);
  });
});
