import { User } from '../entities/User';

export interface UserRepository {
  findByEmail(email: string): Promise<User | null>;
  findAll(): Promise<User[]>;
  updateRole(id: string, role: string): Promise<User>;
  create(user: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User>;
}
