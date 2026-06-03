// Casos de uso para User y Product
import { CreateUserDTO, LoginUserDTO, UserResponseDTO, CreateProductDTO, ProductResponseDTO } from './dtos';

export interface IUserUseCases {
  register(user: CreateUserDTO): Promise<UserResponseDTO>;
  login(credentials: LoginUserDTO): Promise<{ token: string; user: UserResponseDTO }>;
  getProfile(userId: string): Promise<UserResponseDTO>;
}

export interface IProductUseCases {
  createProduct(userId: string, product: CreateProductDTO): Promise<ProductResponseDTO>;
  listProducts(): Promise<ProductResponseDTO[]>;
  getProductById(productId: string): Promise<ProductResponseDTO>;
  deleteProduct(userId: string, productId: string): Promise<void>;
}
