import { PrismaClient } from '@prisma/client';
import { SupportMessageRepository } from '../domain/repositories/SupportMessageRepository';
import { SupportMessage } from '../domain/entities/SupportMessage';

const prisma = new PrismaClient();

export class PrismaSupportMessageRepository implements SupportMessageRepository {
  async create(message: Omit<SupportMessage, 'id' | 'createdAt'>): Promise<SupportMessage> {
    return prisma.supportMessage.create({ data: message }) as unknown as SupportMessage;
  }

  async findAll(): Promise<SupportMessage[]> {
    return prisma.supportMessage.findMany({ orderBy: { createdAt: 'desc' } }) as unknown as SupportMessage[];
  }

  async findById(id: string): Promise<SupportMessage | null> {
    return prisma.supportMessage.findUnique({ where: { id } }) as unknown as SupportMessage | null;
  }

  async markAsRead(id: string): Promise<SupportMessage> {
    return prisma.supportMessage.update({ where: { id }, data: { isRead: true } }) as unknown as SupportMessage;
  }

  async update(id: string, data: Partial<Omit<SupportMessage, 'id' | 'createdAt'>>): Promise<SupportMessage | null> {
    try {
      return await prisma.supportMessage.update({ where: { id }, data });
    } catch {
      return null;
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      await prisma.supportMessage.delete({ where: { id } })
      return true
    } catch {
      return false
    }
  }
}
