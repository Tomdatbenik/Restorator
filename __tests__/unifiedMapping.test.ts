import { Model, MapFrom, MapTo } from "../src";

describe("Unified Mapping", () => {
  class UserModel extends Model {
    @MapFrom("display_name")
    @MapTo("user_display_name")
    public name?: string;
    
    @MapFrom("user_id")
    @MapTo("id")
    public userId?: number;
    
    public email?: string;
  }

  it("should handle both mapFrom and mapTo using the unified mapping function", () => {
    // Test mapFrom (JSON -> Model)
    const json = '{"display_name": "John Doe", "user_id": 123, "email": "john@example.com"}';
    const user = new UserModel();
    
    const fromJsonResult = user.fromJson(json) as UserModel;
    
    expect(fromJsonResult.name).toBe("John Doe");
    expect(fromJsonResult.userId).toBe(123);
    expect(fromJsonResult.email).toBe("john@example.com");
    
    // Test mapTo (Model -> DTO)
    const toResult = fromJsonResult.parse();
    
    expect(toResult.user_display_name).toBe("John Doe");
    expect(toResult.id).toBe(123);
    expect(toResult.email).toBe("john@example.com");
    expect((toResult as any).name).toBe(undefined);
    expect((toResult as any).userId).toBe(undefined);
  });
  
  it("should demonstrate the unified mapping works with explicit mappings", () => {
    const user = new UserModel();
    user.name = "Jane Doe";
    user.userId = 456;
    user.email = "jane@example.com";
    
    // Test explicit mapping
    const explicitMapping = user.parse([["name", "full_name"], ["userId", "user_identifier"]]);
    
    expect(explicitMapping.full_name).toBe("Jane Doe");
    expect(explicitMapping.user_identifier).toBe(456);
    expect((explicitMapping as any).name).toBe(undefined);
    expect((explicitMapping as any).userId).toBe(undefined);
    expect((explicitMapping as any).email).toBe(undefined); // Not included in explicit mapping
  });
});