import { ApiClient } from "../src";
import { RestClient } from "../src";

describe("RestClient", () => {
   it("should be test", () => {
    @RestClient('test')
    class Client extends ApiClient {}
    
    const test = new Client();

    expect(test.baseUrl).toBe('test');
  });
});
