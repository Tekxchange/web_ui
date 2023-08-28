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
    };
    const res = await this.client.post<Response>("/api/auth/login", request, undefined, { withCredentials: true });
    localStorage.setItem("jwt", res.data.jwt);
    this.client.refreshInstance();
  }

  async register(request: RegisterRequest) {
    await this.client.post("/api/auth/register", request);
  }

  async logout() {
    await this.client.get("/api/auth/revoke_token", undefined, { withCredentials: true });
    localStorage.removeItem("jwt");
    this.client.refreshInstance();
  }
}
