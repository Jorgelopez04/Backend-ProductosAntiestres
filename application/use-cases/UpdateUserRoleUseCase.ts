import { UserRepository } from '../../domain/repositories/UserRepository';

export class UpdateUserRoleUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(id: string, role: string) {
    if (!id || !role) {
      throw { status: 400, message: 'User id and role are required' };
    }
    const normalizedRole = role.toLowerCase();
    if (!['user', 'admin'].includes(normalizedRole)) {
      throw { status: 400, message: 'Role must be user or admin' };
    }
    return this.userRepository.updateRole(id, normalizedRole as any);
  }
}
