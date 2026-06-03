import { RegisterDTO, AuthResponseDTO } from '../dto/AuthDTO';
import { UserRepository } from '../../domain/repositories/UserRepository';
import bcrypt from 'bcrypt';
import { generateToken } from '../../infrastructure/jwtService';

export class RegisterUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(data: RegisterDTO): Promise<AuthResponseDTO> {
    if (!data.name || !data.email || !data.password) {
      throw { status: 400, message: 'Name, email and password are required' };
    }
    const existing = await this.userRepository.findByEmail(data.email);
    if (existing) throw { status: 409, message: 'Email already in use' };
    const hashed = await bcrypt.hash(data.password, 10);
    const role = ((data as any).role || 'user').toLowerCase();
    const user = await this.userRepository.create({
      name: data.name,
      email: data.email,
      password: hashed,
      role,
    });
    const token = generateToken({ id: user.id, email: user.email, role: user.role });
    return { id: user.id, name: user.name, email: user.email, role: user.role, token };
  }
}
