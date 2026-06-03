import { Request, Response, NextFunction } from 'express';
import { AuthPrismaRepository } from '../../../infrastructure/repositories/AuthPrismaRepository';
import { RegisterUseCase } from '../../../application/use-cases/auth/RegisterUseCase';
import { LoginUseCase } from '../../../application/use-cases/auth/LoginUseCase';

const authRepository = new AuthPrismaRepository();
const registerUseCase = new RegisterUseCase(authRepository);
const loginUseCase = new LoginUseCase(authRepository);

export class AuthController {
  static async register(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await registerUseCase.execute(req.body);
      res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await loginUseCase.execute(req.body);
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }
}
