import { Request, Response } from 'express';

export default class HealthController {
  static check(req: Request, res: Response) {
    res.status(200).json({ status: 'ok' });
  }
}
