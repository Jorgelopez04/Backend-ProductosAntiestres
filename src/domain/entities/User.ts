export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
  products?: Product[];
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  createdById: string;
  createdAt: Date;
  updatedAt: Date;
}
