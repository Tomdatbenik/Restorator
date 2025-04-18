import { setClientMeta } from "../functions/setClientMeta.function";
import { ApiClient } from "./../classes/client.base";

export function RestClient(baseUrl: string) {
  return function (target: typeof ApiClient, context: ClassDecoratorContext) {
    return setClientMeta(target, "_baseUrl", baseUrl);
  };
}
