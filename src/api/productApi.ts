import { Filter } from "@state/search";
import { RestClient } from "./restClient";

export default class ProductApi extends RestClient {
  async search(_filter: Filter) {}
}
