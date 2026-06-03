import { Request, Response, NextFunction } from 'express';
import { PrismaUserRepository } from '../../infrastructure/PrismaUserRepository';
import { GetUsersUseCase } from '../../application/use-cases/GetUsersUseCase';
import { UpdateUserRoleUseCase } from '../../application/use-cases/UpdateUserRoleUseCase';

const userRepository = new PrismaUserRepository();
const getUsersUseCase = new GetUsersUseCase(userRepository);
const updateUserRoleUseCase = new UpdateUserRoleUseCase(userRepository);

export class UserController {
  static async list(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await getUsersUseCase.execute();
      res.json({ data: users });
    } catch (err) {
      next(err);
    }
  }

  static async updateRole(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.params.id;
      const { role } = req.body;
      const updatedUser = await updateUserRoleUseCase.execute(userId, role);
      const { password, ...userWithoutPassword } = updatedUser as any;
      res.json({ data: userWithoutPassword });
    } catch (err) {
      next(err);
    }
  }
}
