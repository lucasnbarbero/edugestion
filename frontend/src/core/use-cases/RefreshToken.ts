import type { ITokens } from '../entities/ITokens';
import type { IAuthRepository } from '../interfaces/IAuthRepository';

export class RefreshToken {
  constructor(private authRepository: IAuthRepository) {}

  async execute(refreshToken: string): Promise<ITokens> {
    return this.authRepository.refreshToken(refreshToken);
  }
}
