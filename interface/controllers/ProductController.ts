import { Request, Response, NextFunction } from 'express';
import { PrismaProductRepository } from '../../infrastructure/PrismaProductRepository';
import { CreateProductUseCase } from '../../application/use-cases/CreateProductUseCase';
import { GetProductsUseCase } from '../../application/use-cases/GetProductsUseCase';
import { GetProductByIdUseCase } from '../../application/use-cases/GetProductByIdUseCase';
import { UpdateProductUseCase } from '../../application/use-cases/UpdateProductUseCase';
import { DeleteProductUseCase } from '../../application/use-cases/DeleteProductUseCase';

const repo = new PrismaProductRepository();
const createProduct = new CreateProductUseCase(repo);
const getProducts = new GetProductsUseCase(repo);
const getProductById = new GetProductByIdUseCase(repo);
const updateProduct = new UpdateProductUseCase(repo);
const deleteProduct = new DeleteProductUseCase(repo);

export class ProductController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      // @ts-ignore
      const createdById = req.user?.id;
      if (!createdById) return res.status(401).json({ message: 'Unauthorized' });
      const product = await createProduct.execute(req.body, createdById);
      res.status(201).json(product);
    } catch (err) {
      next(err);
    }
  }

  static async list(req: Request, res: Response, next: NextFunction) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const result = await getProducts.execute(page, limit);
      res.json(result);
    } catch (err) {
      next(err);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const product = await getProductById.execute(req.params.id);
      res.json(product);
    } catch (err) {
      next(err);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const product = await updateProduct.execute(req.params.id, req.body);
      res.json(product);
    } catch (err) {
      next(err);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await deleteProduct.execute(req.params.id);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }
}
