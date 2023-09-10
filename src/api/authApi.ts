import { RestClient } from "./restClient";
import state from "../state";
import { setWasLoggedIn } from "../state/auth";

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
    this.client.jwt = res.data.jwt;
    this.client.refreshInstance();
    state.dispatch(setWasLoggedIn(true));
  }

  async register(request: RegisterRequest) {
    await this.client.post("/api/auth/register", request);
  }

  async logout() {
    await this.client.get("/api/auth/revoke_token", undefined, { withCredentials: true });
    this.client.jwt = null;
    this.client.refreshInstance();
    state.dispatch(setWasLoggedIn(false));
  }
}
