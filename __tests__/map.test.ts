import { MapTuple } from "../src";
import { IModel, Exclude, Model } from "../src";
import { MapTo } from "../src";

describe("MapTo", () => {
  class MapModel extends Model {
    @MapTo("target_field")
    public test = "value";

    private leftAlone = "left alone";

    @Exclude()
    private removed = "removed";

    @MapTo("targets_getter")
    private get getterTest(): string {
      return "gettertest";
    }
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
      const model = new MapModel();

      const expected = {
        leftAlone: "left alone",
        target_field: "value",
        targets_getter: "gettertest",
      };

      expect(model.toJson()).toBe(JSON.stringify(expected));
    });

    it("should get return json with mapped object", () => {
      const model = new MapModel();

      const expected = {
        targets_getter: "gettertest",
      };

      expect(model.toJson([["getterTest", "targets_getter"]])).toBe(
        JSON.stringify(expected)
      );
    });
  });

  describe("parse", () => {
    it("should parse to DTO as Model typed as DTO with new fields", () => {
      const model = new MapModel();

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
      const model = new MapModel();

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
      const model = new MapModel();

      //Should be same object
      const actual = model.parse<DifferentType>();

      expect(actual.target_field).toBe("value");
      expect((actual as any).test).toBe(undefined);
    });

    it("should parse to mapping if passed in parameters", () => {
      const model = new MapModel();

      class NewTestClass {
        new_field?: string;
      }

      const mapping: MapTuple<MapModel, NewTestClass> = [["test", "new_field"]];

      //Should be same object
      const actual = model.parse<MapModel>(mapping);

      expect(actual.new_field).toBe("value");
      expect((actual as any).test).toBe(undefined);
      expect(actual).toBeInstanceOf(Model);
    });

    it("should parse to mapping with new type", () => {
      const model = new MapModel();

      class NewTestClass {
        new_field?: string;
      }

      const mapping: MapTuple<MapModel, NewTestClass> = [["test", "new_field"]];

      //Should be same object
      const actual = model.parse<MapModel, NewTestClass>(mapping, NewTestClass);

      expect(actual.new_field).toBe("value");
      expect((actual as any).test).toBe(undefined);
      expect(actual).toBeInstanceOf(NewTestClass);
    });

    it("should parse to mapping with new type and used params", () => {
      const model = new MapModel();

      class NewTestClass {
        new_field?: string;
        otherField: string;
        objectField: string;

        constructor(otherField: string, objectParam: { objectField: string }) {
          this.otherField = otherField;
          this.objectField = objectParam.objectField;
        }
      }

      const mapping: MapTuple<MapModel, NewTestClass> = [["test", "new_field"]];

      //Should be same object
      const actual = model.parse<MapModel, NewTestClass>(
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
  });
});
