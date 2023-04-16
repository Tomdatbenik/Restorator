import { ApiClient } from "../src";
import { RestClient } from "../src";

describe("RestClient", () => {
  @RestClient('test')
  class Client extends ApiClient {}

  it("should be true", () => {
    const test = new Client();

    expect(test.baseUrl).toBe('test');
  });
});
