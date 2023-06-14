import { ClientMeta } from "@/interfaces/clientMeta.interface";

export class ApiClient {
  public _meta?: Partial<ClientMeta>;

  get baseUrl(): string | undefined {
    if (!this._meta?._baseUrl) {
      return;
    } else {
      return this._meta._baseUrl;
    }
  }
}
