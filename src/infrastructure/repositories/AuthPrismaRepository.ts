import { PrismaClient } from '@prisma/client';
import { AuthRepository } from '../../domain/repositories/AuthRepository';
import { User } from '../../domain/entities/User';

const prisma = new PrismaClient();

export class AuthPrismaRepository implements AuthRepository {
  async findByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { email } }) as any;
  }

  async create(user: Omit<User, 'id' | 'createdAt' | 'updatedAt' | 'products'>): Promise<User> {
    return prisma.user.create({ data: user }) as any;
  }
}
