import axios, { AxiosInstance, AxiosResponse, AxiosError } from "axios";

export class ApiClient {
  private _axios: AxiosInstance;
  private _refreshToken: string | null;
  private _jwt: string | null;
  private _baseURL: string;

  constructor(baseURL: string) {
    this._baseURL = baseURL;
    this._jwt = localStorage.getItem("jwt");
    this._refreshToken = localStorage.getItem("refresh");
    this._axios = this.buildAxios();
  }

  get jwt(): string | null {
    return this._jwt;
  }

  get refresh(): string | null {
    return this._refreshToken;
  }

  refreshInstance() {
    this._jwt = localStorage.getItem("jwt");
    this._refreshToken = localStorage.getItem("refresh");
    this._axios = this.buildAxios();
  }

  private buildAxios(): AxiosInstance {
    return axios.create({
      baseURL: this._baseURL,
      headers: {
        ...(this._jwt ? { auth: this._jwt } : {}),
        ...(this._refreshToken ? { refresh: this._refreshToken } : {}),
      },
    });
  }

  async get<T>(
    url: string,
    params?: Record<string, unknown>
  ): Promise<AxiosResponse<T, any>> {
    if (!params) {
      params = {};
    }
    try {
      return await this._axios.get<T>(url, { params });
    } catch (e) {
      if (e instanceof AxiosError && e.response?.status === 401) {
        await this.refreshToken();
        return await this._axios.get<T>(url, { params });
      }
      throw e;
    }
  }

  async post<T>(
    url: string,
    data: Record<string, unknown> | Record<string, unknown>[],
    params?: Record<string, unknown>
  ): Promise<AxiosResponse<T, any>> {
    try {
      return await this._axios.post(url, data, { params });
    } catch (e) {
      if (e instanceof AxiosError && e.response?.status === 401) {
        await this.refreshToken();
        return await this._axios.post(url, data, { params });
      }
      throw e;
    }
  }

  private async refreshToken() {
    const res = await this._axios.get<string>("/api/auth/refresh");
    this._jwt = res.data;
    localStorage.setItem("jwt", this._jwt);
    this.refreshInstance();
  }
}

export abstract class RestClient {
  protected client: ApiClient;
  constructor(client: ApiClient) {
    this.client = client;
  }
}
