import type { ITokens } from '../entities/ITokens';
import type { IUser } from '../entities/IUser';

export interface IAuthRepository {
  login(email: string, password: string): Promise<ITokens>;
  refreshToken(refreshToken: string): Promise<ITokens>;
  getProfile(): Promise<IUser>;
}
