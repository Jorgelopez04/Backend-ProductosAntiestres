import { User } from '../entities/User';

export interface AuthRepository {
  findByEmail(email: string): Promise<User | null>;
  create(user: Omit<User, 'id' | 'createdAt' | 'updatedAt' | 'products'>): Promise<User>;
}
