import { Request, Response, NextFunction } from 'express';
import { PrismaSupportMessageRepository } from '../../infrastructure/PrismaSupportMessageRepository';
import { CreateSupportMessageUseCase } from '../../application/use-cases/CreateSupportMessageUseCase';
import { GetSupportMessagesUseCase } from '../../application/use-cases/GetSupportMessagesUseCase';
import { MarkSupportMessageReadUseCase } from '../../application/use-cases/MarkSupportMessageReadUseCase';
import { GetSupportMessageByIdUseCase } from '../../application/use-cases/GetSupportMessageByIdUseCase';
import { UpdateSupportMessageUseCase } from '../../application/use-cases/UpdateSupportMessageUseCase';
import { DeleteSupportMessageUseCase } from '../../application/use-cases/DeleteSupportMessageUseCase';

const supportRepository = new PrismaSupportMessageRepository();
const createSupportMessageUseCase = new CreateSupportMessageUseCase(supportRepository);
const getSupportMessagesUseCase = new GetSupportMessagesUseCase(supportRepository);
const getSupportMessageByIdUseCase = new GetSupportMessageByIdUseCase(supportRepository);
const markSupportMessageReadUseCase = new MarkSupportMessageReadUseCase(supportRepository);
const updateSupportMessageUseCase = new UpdateSupportMessageUseCase(supportRepository);
const deleteSupportMessageUseCase = new DeleteSupportMessageUseCase(supportRepository);

export class SupportController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await createSupportMessageUseCase.execute(req.body);
      res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  }

  static async list(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await getSupportMessagesUseCase.execute();
      res.json({ data: result });
    } catch (err) {
      next(err);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await getSupportMessageByIdUseCase.execute(req.params.id);
      res.json(result);
    } catch (err) {
      next(err);
    }
  }

  static async markRead(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await markSupportMessageReadUseCase.execute(req.params.id);
      res.json({ data: result });
    } catch (err) {
      next(err);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await updateSupportMessageUseCase.execute(req.params.id, req.body);
      res.json(result);
    } catch (err) {
      next(err);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await deleteSupportMessageUseCase.execute(req.params.id);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }
}
