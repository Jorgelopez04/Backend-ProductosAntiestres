import { LoginDTO, AuthResponseDTO } from '../dto/AuthDTO';
import { UserRepository } from '../../domain/repositories/UserRepository';
import bcrypt from 'bcrypt';
import { generateToken } from '../../infrastructure/jwtService';

export class LoginUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(data: LoginDTO): Promise<AuthResponseDTO> {
    if (!data.email || !data.password) {
      throw { status: 400, message: 'Email and password are required' };
    }
    const user = await this.userRepository.findByEmail(data.email);
    if (!user) throw { status: 401, message: 'Invalid credentials' };
    const valid = await bcrypt.compare(data.password, user.password);
    if (!valid) throw { status: 401, message: 'Invalid credentials' };
    const token = generateToken({ id: user.id, email: user.email, role: user.role });
    return { id: user.id, name: user.name, email: user.email, role: user.role, token };
  }
}
