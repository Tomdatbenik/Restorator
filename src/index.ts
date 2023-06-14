import { Collection } from './classes/collection.base';
import { ApiClient } from "./classes/client.base";
import { Model  } from "./classes/model.base";
import { RestClient } from "./decorators/restClient.decorator";
import { Creatable } from "./decorators/creatable.decorator";
import { Deletable } from './decorators/deletable.decorator';

export { Creatable, Deletable, RestClient, ApiClient, Model, Collection };
