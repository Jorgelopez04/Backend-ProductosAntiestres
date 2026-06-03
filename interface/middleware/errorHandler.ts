import { Request, Response, NextFunction } from 'express'

export default function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  // Log server-side for debugging (do not expose stack trace to clients)
  console.error(err)
  res.status(err?.status || 500).json({
    message: err?.message || 'Internal Server Error',
  })
}
