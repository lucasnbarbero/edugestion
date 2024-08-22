import type { IAuthRepository } from '../interfaces/IAuthRepository';
import type { ITokens } from '../entities/ITokens';
import { AuthRepository } from '@/infrastructure/repositories/AuthRepository';

export class LoginUser {
  private _authRepository: IAuthRepository;

  constructor() {
    this._authRepository = new AuthRepository();
  }

  async execute(email: string, password: string): Promise<ITokens> {
    return this._authRepository.login(email, password);
  }
}
