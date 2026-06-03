import { ProductRepository } from '../../domain/repositories/ProductRepository';

export class DeleteProductUseCase {
  constructor(private productRepository: ProductRepository) {}

  async execute(id: string): Promise<void> {
    const deleted = await this.productRepository.delete(id);
    if (!deleted) throw { status: 404, message: 'Product not found' };
  }
}
