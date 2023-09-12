import axios, { AxiosInstance, AxiosResponse, AxiosError } from "axios";
import { toast } from "react-toastify";

export class ApiClient {
  private _axios: AxiosInstance;
  private _jwt: string | null;
  private _baseURL: string;

  constructor(baseURL: string) {
    this._baseURL = baseURL;
    this._jwt = sessionStorage.getItem("token");
    this._axios = this.buildAxios();
  }

  get jwt(): string | null {
    return this._jwt;
  }

  set jwt(toSet: string | null) {
    this._jwt = toSet;
  }

  refreshInstance() {
    this._axios = this.buildAxios();
  }

  private buildAxios(): AxiosInstance {
    return axios.create({
      baseURL: this._baseURL,
      headers: {
        ...(this._jwt ? { authorization: this._jwt } : {}),
      },
    });
  }

  async get<T>(
    url: string,
    params?: Record<string, unknown>,
    options?: Parameters<(typeof axios)["get"]>[1],
  ): Promise<AxiosResponse<T, unknown>> {
    if (!params) {
      params = {};
    }
    try {
      return await this._axios.get<T>(url, { ...options, params });
    } catch (e) {
      if (e instanceof AxiosError && e.response?.status === 401) {
        await this.refreshToken();
        return await this._axios.get<T>(url, { ...options, params });
      }
      const error = e as AxiosError<{ error?: string }>;

      toast.error(error.response?.data?.error || "An error occurred with your request. Please try again");
      throw e;
    }
  }

  async post<T>(
    url: string,
    data: Record<string, unknown> | Record<string, unknown>[] | FormData,
    params?: Record<string, unknown>,
    options?: Parameters<(typeof axios)["post"]>[2],
  ): Promise<AxiosResponse<T, unknown>> {
    try {
      return await this._axios.post(url, data, { ...options, params });
    } catch (e) {
      if (e instanceof AxiosError && e.response?.status === 401) {
        await this.refreshToken();
        return await this._axios.post(url, data, { ...options, params });
      }
      const error = e as AxiosError<{ error?: string }>;

      toast.error(error.response?.data?.error || "An error occurred with your request. Please try again");
      throw e;
    }
  }

  private async refreshToken() {
    type Response = {
      jwt: string;
    };
    const res = await this._axios.get<Response>("/api/auth/refresh", { withCredentials: true });
    this._jwt = res.data.jwt;
    sessionStorage.setItem("token", this._jwt);
    this.refreshInstance();
  }
}

export abstract class RestClient {
  protected client: ApiClient;
  constructor(client: ApiClient) {
    this.client = client;
  }
}
