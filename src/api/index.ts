import AuthApi from "./authApi";
import ProductApi from "./productApi";
import { ApiClient } from "./restClient";
import UserApi from "./userApi";

const BASE_URL = import.meta.env.DEV ? "http://localhost:8000" : "https://backend.tekxchange.net";

const apiClient = new ApiClient(BASE_URL);

export default {
  authApi: new AuthApi(apiClient),
  userApi: new UserApi(apiClient),
  productApi: new ProductApi(apiClient),
} as const;
