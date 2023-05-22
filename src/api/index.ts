import AuthApi from "./authApi";
import { ApiClient } from "./restClient";
import UserApi from "./userApi";

const BASE_URL = "https://backend.tekxchange.net" as const;

const apiClient = new ApiClient(BASE_URL);

export default {
  authApi: new AuthApi(apiClient),
  userApi: new UserApi(apiClient),
} as const;
