import type { IAuthRepository } from '@/core/interfaces/IAuthRepository';
import { ApiClient } from '../api/ApiClient';
import type { ITokens } from '@/core/entities/ITokens';
import type { IUser } from '@/core/entities/IUser';

export class AuthRepository implements IAuthRepository {
  private readonly apiClien: ApiClient;

  constructor() {
    this.apiClien = new ApiClient();
  }

  async login(email: string, password: string): Promise<ITokens> {
    return this.apiClien.post<ITokens>('/auth/login', { email, password });
  }

  async refreshToken(refreshToken: string): Promise<ITokens> {
    return this.apiClien.post<ITokens>('/auth/refresh-token', { refreshToken });
  }

  async getProfile(): Promise<IUser> {
    return this.apiClien.get<IUser>('/auth/profile');
  }
}
