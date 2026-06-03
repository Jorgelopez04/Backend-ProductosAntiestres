// DTOs para User y Product

export interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
  role?: string; // default: user
}

export interface LoginUserDTO {
  email: string;
  password: string;
}

export interface UserResponseDTO {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface CreateProductDTO {
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

export interface ProductResponseDTO {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  createdById: string;
}
