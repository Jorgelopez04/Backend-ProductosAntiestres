import { Product } from '../entities/Product';

export interface ProductRepository {
  findAll(page: number, limit: number): Promise<{ data: Product[]; total: number; }>;
  findById(id: string): Promise<Product | null>;
  create(product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<Product>;
  update(id: string, product: Partial<Omit<Product, 'id' | 'createdAt' | 'updatedAt' | 'createdById'>>): Promise<Product | null>;
  delete(id: string): Promise<boolean>;
}
