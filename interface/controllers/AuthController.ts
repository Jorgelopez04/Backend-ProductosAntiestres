import { Request, Response, NextFunction } from 'express';
import { PrismaUserRepository } from '../../infrastructure/PrismaUserRepository';
import { RegisterUserUseCase } from '../../application/use-cases/RegisterUserUseCase';
import { LoginUserUseCase } from '../../application/use-cases/LoginUserUseCase';
import { verifyToken } from '../../infrastructure/jwtService';

const userRepository = new PrismaUserRepository();
const registerUseCase = new RegisterUserUseCase(userRepository);
const loginUseCase = new LoginUserUseCase(userRepository);

export class AuthController {
  static async register(req: Request, res: Response, next: NextFunction) {
    try {
      // For security: always force role to USER for registrations through this endpoint.
      // Admins should be created only via the administrative script `createAdmin.ts`.
      const body = { ...req.body, role: 'USER' } as any;
      const result = await registerUseCase.execute(body);
      res.status(201).json(result);
    } catch (err: any) {
      next(err);
    }
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await loginUseCase.execute(req.body);
      res.status(200).json(result);
    } catch (err: any) {
      next(err);
    }
  }
}
