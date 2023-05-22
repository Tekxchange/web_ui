import { RestClient } from "./restClient";

export type LoginRequest = {
  username?: string;
  email?: string;
  password: string;
};

export type RegisterRequest = {
  username: string;
  email: string;
  password: string;
};

export default class AuthApi extends RestClient {
  async login(request: LoginRequest) {
    type Response = {
      jwt: string;
      refreshToken: string;
    };

    const res = await this.client.post<Response>("/api/auth/login", request);
    localStorage.setItem("jwt", res.data.jwt);
    localStorage.setItem("refresh", res.data.refreshToken);
    this.client.refreshInstance();
  }

  async register(request: RegisterRequest) {
    await this.client.post("/api/auth/register", request);
  }
}
