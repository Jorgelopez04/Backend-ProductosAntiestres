import { PrismaClient } from '@prisma/client';
import { UserRepository } from '../domain/repositories/UserRepository';
import { User } from '../domain/entities/User';

const prisma = new PrismaClient();

export class PrismaUserRepository implements UserRepository {
  async findByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { email } }) as unknown as User | null;
  }

  async findAll(): Promise<User[]> {
    return prisma.user.findMany() as unknown as User[];
  }

  async updateRole(id: string, role: User['role']): Promise<User> {
    return prisma.user.update({ where: { id }, data: { role } }) as unknown as User;
  }

  async create(user: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> {
    return prisma.user.create({ data: user }) as unknown as User;
  }
}
