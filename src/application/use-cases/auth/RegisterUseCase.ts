import { RegisterDTO } from '../../dto/RegisterDTO';
import { AuthRepository } from '../../../domain/repositories/AuthRepository';
import bcrypt from 'bcryptjs';
import { generateToken } from '../../../infrastructure/services/jwtService';
import { AuthResponseDTO } from '../../dto/AuthResponseDTO';

export class RegisterUseCase {
  constructor(private authRepository: AuthRepository) {}

  async execute(data: RegisterDTO): Promise<AuthResponseDTO> {
    const existing = await this.authRepository.findByEmail(data.email);
    if (existing) throw new Error('Email already in use');
    const hashed = await bcrypt.hash(data.password, 10);
    const user = await this.authRepository.create({
      name: data.name,
      email: data.email,
      password: hashed,
      role: 'user',
    });
    const token = generateToken({ id: user.id, email: user.email, role: user.role });
    return { id: user.id, name: user.name, email: user.email, role: user.role, token };
  }
}
