import { ClientMeta } from "@/interfaces/clientMeta.interface";
import { ApiClient } from "..";

export function setClientMeta(
  target: typeof ApiClient,
  prop: keyof ClientMeta,
  value: any
) {
  const meta = target.prototype._meta;

  return class extends target {
    _meta = { [prop]: value, ...meta};
  };
}
