import { ProductRepository } from '../../domain/repositories/ProductRepository';
import { ProductDTO } from '../dto/ProductDTO';

export class GetProductByIdUseCase {
  constructor(private productRepository: ProductRepository) {}

  async execute(id: string): Promise<ProductDTO> {
    const product = await this.productRepository.findById(id);
    if (!product) throw { status: 404, message: 'Product not found' };
    return product;
  }
}
