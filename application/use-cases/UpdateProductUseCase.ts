import { ProductRepository } from '../../domain/repositories/ProductRepository';
import { UpdateProductDTO, ProductDTO } from '../dto/ProductDTO';

export class UpdateProductUseCase {
  constructor(private productRepository: ProductRepository) {}

  async execute(id: string, data: UpdateProductDTO): Promise<ProductDTO> {
    const updated = await this.productRepository.update(id, data);
    if (!updated) throw { status: 404, message: 'Product not found' };
    return updated;
  }
}
