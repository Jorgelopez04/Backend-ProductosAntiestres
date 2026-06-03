export interface ProductDTO {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  createdById: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateProductDTO {
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

export interface UpdateProductDTO {
  name?: string;
  description?: string;
  price?: number;
  imageUrl?: string;
}
