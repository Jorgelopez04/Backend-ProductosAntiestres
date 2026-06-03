import { ProductRepository } from '../../domain/repositories/ProductRepository';
import { CreateProductDTO, ProductDTO } from '../dto/ProductDTO';

export class CreateProductUseCase {
  constructor(private productRepository: ProductRepository) {}

  async execute(data: CreateProductDTO, createdById: string): Promise<ProductDTO> {
    if (!data.name || !data.description || !data.price || !data.imageUrl) {
      throw { status: 400, message: 'All fields are required' };
    }
    const product = await this.productRepository.create({ ...data, createdById });
    return product;
  }
}
