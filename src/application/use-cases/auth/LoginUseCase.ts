import { LoginDTO } from '../../dto/LoginDTO';
import { AuthRepository } from '../../../domain/repositories/AuthRepository';
import bcrypt from 'bcryptjs';
import { generateToken } from '../../../infrastructure/services/jwtService';
import { AuthResponseDTO } from '../../dto/AuthResponseDTO';

export class LoginUseCase {
  constructor(private authRepository: AuthRepository) {}

  async execute(data: LoginDTO): Promise<AuthResponseDTO> {
    const user = await this.authRepository.findByEmail(data.email);
    if (!user) throw new Error('Invalid credentials');
    const valid = await bcrypt.compare(data.password, user.password);
    if (!valid) throw new Error('Invalid credentials');
    const token = generateToken({ id: user.id, email: user.email, role: user.role });
    return { id: user.id, name: user.name, email: user.email, role: user.role, token };
  }
}
