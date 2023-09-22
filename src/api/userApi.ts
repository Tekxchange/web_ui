import { RestClient } from "./restClient";

export type UserInfo = {
  id: number;
  username: string;
  email: string;
};

export type MinUserReturn = {
  id: number;
  username: string;
}

export default class UserApi extends RestClient {
  async getSelfInfo() {
    const res = await this.client.get<UserInfo>("/api/users/user/info");
    return res.data;
  }
}
