import AuthApi from "./authApi";
import ProductApi from "./productApi";
import { ApiClient } from "./restClient";
import UserApi from "./userApi";

const BASE_URL = "https://backend.tekxchange.net" as const;
// const BASE_URL = "http://localhost:8000" as const;

const apiClient = new ApiClient(BASE_URL);

export default {
  authApi: new AuthApi(apiClient),
  userApi: new UserApi(apiClient),
  productApi: new ProductApi(apiClient),
} as const;
