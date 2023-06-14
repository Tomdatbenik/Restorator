import { Collection } from './classes/collection.base';
import { ApiClient } from "./classes/client.base";
import { Model as BModel } from "./classes/model.base";
import { RestClient } from "./decorators/restClient.decorator";
import { Creatable } from "./decorators/creatable.decorator";


type TModel = Omit<BModel, '_meta'>

class Model extends BModel implements TModel {}

export { Creatable, RestClient, ApiClient, Model, Collection };
