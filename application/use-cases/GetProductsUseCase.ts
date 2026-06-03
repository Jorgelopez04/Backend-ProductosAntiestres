import { ProductRepository } from '../../domain/repositories/ProductRepository';
import { ProductDTO } from '../dto/ProductDTO';

export class GetProductsUseCase {
  constructor(private productRepository: ProductRepository) {}

  async execute(page = 1, limit = 10): Promise<{ data: ProductDTO[]; meta: any }> {
    const { data, total } = await this.productRepository.findAll(page, limit);
    return {
      data,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    };
  }
}
