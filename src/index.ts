import { Collection } from "./classes/collection.base";
import { ApiClient } from "./classes/client.base";
import { Model } from "./classes/model.base";
import { RestClient } from "./decorators/restClient.decorator";
import { Creatable } from "./decorators/creatable.decorator";
import { Deletable } from "./decorators/deletable.decorator";
import { Bound } from "./decorators/bound.decorator";
import { MapTo } from "./decorators/mapTo.decorator";
import { IModel } from "./interfaces/model.interface";
import { Exclude } from "./decorators/exclude.decorator";
import { MapToTuple, MapTuple } from "./interfaces/mapTuple.interface";

export {
  Creatable,
  Deletable,
  RestClient,
  ApiClient,
  Model,
  IModel,
  Collection,
  Bound,
  MapTo,
  Exclude,
  MapTuple,
  MapToTuple,
};
