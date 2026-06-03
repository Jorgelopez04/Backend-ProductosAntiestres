import { UserRepository } from '../../domain/repositories/UserRepository';
import { User } from '../../domain/entities/User';

export class GetUsersUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(): Promise<Omit<User, 'password'>[]> {
    const users = await this.userRepository.findAll();
    return users.map(({ password, ...rest }) => rest);
  }
}
