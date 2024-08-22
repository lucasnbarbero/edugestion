import { useAuthStore } from '@/stores/auth';
import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios';
import { AuthRepository } from '../repositories/AuthRepository';
import { RefreshToken } from '@/core/use-cases/RefreshToken';

export class ApiClient {
  private _url: string = 'https://api.escuelajs.co/api/v1';
  private _instance: AxiosInstance;
  private _refreshing: Promise<void> | null = null;

  constructor() {
    this._instance = axios.create({
      baseURL: this._url,
      timeout: 5000,
    });
    this.setupRequestInterceptors();
    this.setupResponseInterceptors();
  }

  private setupRequestInterceptors() {
    this._instance.interceptors.request.use(
      (config) => {
        const authStore = useAuthStore();
        const token = authStore.accessToken;
        if (token) config.headers!['Authorization'] = `Bearer ${token}`;

        return config;
      },
      (error) => {
        return Promise.reject(error);
      },
    );
  }

  private setupResponseInterceptors() {
    this._instance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const authStore = useAuthStore();

        if (error.response?.status === 401 && !error.config._retry) {
          error.config._retry = true;

          if (!this._refreshing) {
            this._refreshing = this._refreshAccessToken();
          }

          await this._refreshing;
          this._refreshing = null;

          const token = authStore.accessToken;
          if (token) error.config.headers['Authorization'] = `Bearer ${token}`;

          return this._instance.request(error.config);
        }

        return Promise.reject(error);
      },
    );
  }

  private async _refreshAccessToken() {
    const authStore = useAuthStore();
    const refreshToken = authStore.refreshToken;

    if (!refreshToken) {
      authStore.clearTokens();
      throw new Error('No refresh token available');
    }

    try {
      const authRepository = new AuthRepository();
      const refreshTokenUseCase = new RefreshToken(authRepository);
      const { access_token, refresh_token } = await refreshTokenUseCase.execute(refreshToken);

      authStore.setTokens(access_token, refresh_token);
    } catch (error) {
      authStore.clearTokens();
      throw new Error('Unable to refresh token');
    }
  }

  public async get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this._instance.get<T>(url, config);
    return response.data;
  }

  public async post<T = any, R = any>(
    url: string,
    data: R,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    const response = await this._instance.post<T>(url, data, config);
    return response.data;
  }

  public async put<T = any, R = any>(
    url: string,
    data: R,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    const response = await this._instance.put<T>(url, data, config);
    return response.data;
  }

  public async delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this._instance.delete<T>(url, config);
    return response.data;
  }
}
