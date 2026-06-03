export interface ProductDTO {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  createdById: string;
}

export interface CreateProductDTO {
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}
