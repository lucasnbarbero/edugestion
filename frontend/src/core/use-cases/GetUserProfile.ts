import type { IUser } from '../entities/IUser';
import type { IAuthRepository } from '../interfaces/IAuthRepository';

export class GetUserProfile {
  constructor(private authRepository: IAuthRepository) {}

  async execute(): Promise<IUser> {
    return this.authRepository.getProfile();
  }
}
