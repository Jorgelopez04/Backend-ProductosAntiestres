import { NextFunction, Request, Response } from 'express'
import { ZodTypeAny } from 'zod'

export function validate(schema: ZodTypeAny, property: 'body' | 'query' | 'params' = 'body') {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req[property]
      const result = await schema.parseAsync(data)
      // attach parsed data for handlers if needed
      ;(req as any).validated = (req as any).validated || {}
      ;(req as any).validated[property] = result
      next()
    } catch (err: any) {
      const message = err?.errors ? err.errors.map((e: any) => e.message).join(', ') : err.message
      res.status(400).json({ message: `Invalid ${property}: ${message}` })
    }
  }
}
