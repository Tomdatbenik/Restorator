import { MapToTuple, MapTuple } from "../src";
import { IModel, Exclude, Model } from "../src";
import { MapTo } from "../src";

describe("MapTo", () => {
  class MapToModel extends Model {
    @MapTo("target_field")
    public test = "value";

    private leftAlone = "left alone";

    @MapTo("targets_getter")
    private get getterTest(): string {
      return "gettertest";
    }
  }

  class ChildModel extends Model {
    @MapTo("childTarget")
    private childSource = "childSource";

    private lowestModel = new LowestModel();
  }

  class LowestModel extends Model {
    @MapTo("lowestTarget")
    private lowestSource = "lowestSource";
  }

  class ParentModel extends Model {
    @MapTo("parentTarget")
    private parentSource = "parentSource";

    private childModel = new ChildModel();
  }

  class ChildMatoModel extends Model {
    @MapTo("childTarget")
    private childSource = "childSource";
  }

  class ParentMaptoModel extends Model {
    @MapTo("parentTarget")
    private parentSource = "parentSource";

    @MapTo("childModelTarget")
    private childModel = new ChildMatoModel();
  }

  class MultiMapToModel extends Model {
    @MapTo("target_field")
    @MapTo("target_field2")
    public test = "value";
  }

  interface MultiMapToModelDTO extends IModel {
    target_field: string;
    target_field2: string;
  }

  interface DTO extends IModel {
    leftAlone: string;
    target_field: string;
    targets_getter: string;
  }

  interface DifferentType {
    target_field: string;
  }

  describe("toJson", () => {
    it("should get return json of the object", () => {
      const model = new MapToModel();

      const expected = {
        leftAlone: "left alone",
        target_field: "value",
        targets_getter: "gettertest",
      };

      expect(model.toJson()).toBe(JSON.stringify(expected));
    });

    it("should get return json with mapped object", () => {
      const model = new MapToModel();

      const expected = {
        targets_getter: "gettertest",
      };

      expect(model.toJson([["getterTest", "targets_getter"]])).toBe(
        JSON.stringify(expected)
      );
    });

    it("Should parse through children", () => {
      const parentModel = new ParentModel();

      const actual = parentModel.toJson();

      const expected = {
        childModel: {
          lowestModel: { lowestTarget: "lowestSource" },
          childTarget: "childSource",
        },
        parentTarget: "parentSource",
      };

      expect(actual).toBe(JSON.stringify(expected));
    });
  });

  describe("parse", () => {
    it("should parse to any", () => {
      const model = new MapToModel();

      const expected = {
        leftAlone: "left alone",
        target_field: "value",
        targets_getter: "gettertest",
      };

      const actual = model.parse();

      expect(actual.toJson()).toBe(JSON.stringify(expected));
      expect(actual.target_field).toBe("value");
      expect(actual.targets_getter).toBe("gettertest");
      expect(actual.leftAlone).toBe("left alone");
      expect(actual.test).toBe(undefined);
    });

    it("should parse to DTO as Model typed as DTO with new fields", () => {
      const model = new MapToModel();

      const expected = {
        leftAlone: "left alone",
        target_field: "value",
        targets_getter: "gettertest",
      };

      const actual = model.parse<DTO>();

      expect(actual.toJson()).toBe(JSON.stringify(expected));
      expect(actual.target_field).toBe("value");
      expect(actual.targets_getter).toBe("gettertest");
      expect(actual.leftAlone).toBe("left alone");
      expect((actual as any).test).toBe(undefined);
    });

    it("should be able to call parse after parse since parsed model is still instance of model, parsed object should be new object", () => {
      const model = new MapToModel();

      const expected = {
        leftAlone: "left alone",
        target_field: "value",
        targets_getter: "gettertest",
      };

      //Should be same object
      const actual = model.parse<DTO>();
      const parsedActual = actual.parse<DTO>();

      expect(actual).toEqual(parsedActual);

      expect(actual.target_field).toBe("value");
      expect(actual.targets_getter).toBe("gettertest");
      expect(actual.leftAlone).toBe("left alone");

      parsedActual.target_field = "new value";

      expect(parsedActual.target_field).toBe("new value");
      expect(actual.target_field).toBe("value");
      expect(actual.toJson()).toBe(JSON.stringify(expected));

      expect(actual).toBeInstanceOf(Model);
      expect(parsedActual).toBeInstanceOf(Model);
    });

    it("should removes old fields", () => {
      const model = new MapToModel();

      //Should be same object
      const actual = model.parse<DifferentType>();

      expect(actual.target_field).toBe("value");
      expect((actual as any).test).toBe(undefined);
    });

    it("should parse to mapping if passed in parameters with MapToTuple", () => {
      const model = new MapToModel();

      class NewTestClass {
        new_field?: string;
      }

      const mapping: MapToTuple<MapToModel> = [["test", "new_field"]];

      //Should be same object
      const actual: NewTestClass = model.parse<MapToModel>(mapping);

      expect(actual.new_field).toBe("value");
      expect((actual as any).test).toBe(undefined);
      expect((actual as any).getterTest).toBe(undefined);
      expect(actual).toBeInstanceOf(Model);
    });

    it("should parse to mapping if passed in parameters with MapTuple", () => {
      const model = new MapToModel();

      class NewTestClass {
        new_field?: string;
      }

      const mapping: MapTuple<MapToModel, NewTestClass> = [
        ["test", "new_field"],
      ];

      //Should be same object
      const actual: NewTestClass = model.parse<MapToModel>(mapping);

      expect(actual.new_field).toBe("value");
      expect((actual as any).test).toBe(undefined);
      expect((actual as any).getterTest).toBe(undefined);
      expect(actual).toBeInstanceOf(Model);
    });

    it("should parse to mapping with new type", () => {
      const model = new MapToModel();

      class NewTestClass {
        new_field?: string;
      }

      const mapping: MapTuple<MapToModel, NewTestClass> = [
        ["test", "new_field"],
      ];

      //Should be same object with correct type
      const actual = model.parse<MapToModel, NewTestClass>(
        mapping,
        NewTestClass
      );

      expect(actual.new_field).toBe("value");
      expect((actual as any).test).toBe(undefined);
      expect(actual).toBeInstanceOf(NewTestClass);
    });

    it("should parse to mapping with new type and used params", () => {
      const model = new MapToModel();

      class NewTestClass {
        new_field?: string;
        otherField: string;
        objectField: string;

        constructor(otherField: string, objectParam: { objectField: string }) {
          this.otherField = otherField;
          this.objectField = objectParam.objectField;
        }
      }

      const mapping: MapTuple<MapToModel, NewTestClass> = [
        ["test", "new_field"],
      ];

      //Should be same object
      const actual = model.parse<MapToModel, NewTestClass>(
        mapping,
        NewTestClass,
        "OtherFieldValue",
        { objectField: "test" }
      );

      expect(actual.new_field).toBe("value");
      expect(actual.otherField).toBe("OtherFieldValue");
      expect(actual.objectField).toBe("test");
      expect((actual as any).test).toBe(undefined);
      expect(actual).toBeInstanceOf(NewTestClass);
    });

    it("Should parse through children", () => {
      const parentModel = new ParentModel();

      const actual = parentModel.parse();

      const child = actual.childModel;

      const lowest = child.lowestModel;

      expect(actual.parentTarget).toBe("parentSource");
      expect(child.childTarget).toBe("childSource");
      expect(lowest.lowestTarget).toBe("lowestSource");
    });

    it("Should parse through children", () => {
      const parentModel = new ParentMaptoModel();

      const actual = parentModel.parse();

      const child = actual.childModelTarget;

      expect(actual.parentTarget).toBe("parentSource");
      expect(child.childTarget).toBe("childSource");
    });
  });

  describe("multiple MapTo", () => {
    it("should parse to multiple maps", () => {
      const model = new MultiMapToModel();

      const expected = {
        target_field: "value",
        target_field2: "value",
      };

      const actual = model.parse<MultiMapToModelDTO>();

      expect(actual.toJson()).toBe(JSON.stringify(expected));
      expect(actual.target_field).toBe("value");
      expect(actual.target_field2).toBe("value");
    });
  });
});
