import { PrismaClient } from '@prisma/client';
import { ProductRepository } from '../domain/repositories/ProductRepository';
import { Product } from '../domain/entities/Product';

const prisma = new PrismaClient();

export class PrismaProductRepository implements ProductRepository {
  async findAll(page: number, limit: number): Promise<{ data: Product[]; total: number }> {
    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      prisma.product.findMany({ skip, take: limit, orderBy: { createdAt: 'desc' } }),
      prisma.product.count()
    ]);
    return { data, total };
  }

  async findById(id: string): Promise<Product | null> {
    return prisma.product.findUnique({ where: { id } });
  }

  async create(product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<Product> {
    return prisma.product.create({ data: product });
  }

  async update(id: string, product: Partial<Omit<Product, 'id' | 'createdAt' | 'updatedAt' | 'createdById'>>): Promise<Product | null> {
    try {
      return await prisma.product.update({ where: { id }, data: product });
    } catch {
      return null;
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      await prisma.product.delete({ where: { id } });
      return true;
    } catch {
      return false;
    }
  }
}
