import { z } from 'zod'
import { UserRole } from '../../domain/models'

export const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
})

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
})

export const createProductSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  price: z.number().positive(),
  imageUrl: z.string().url().optional(),
})

export const updateProductSchema = createProductSchema.partial()

export const idParamSchema = z.object({ id: z.string().min(1) })

export const getProductsQuerySchema = z.object({
  page: z.preprocess((v) => Number(v), z.number().int().positive()).optional(),
  limit: z.preprocess((v) => Number(v), z.number().int().positive()).optional(),
})

export const createSupportSchema = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
  message: z.string().min(1),
})

export const updateSupportSchema = z.object({
  message: z.string().optional(),
  isRead: z.boolean().optional(),
})

export const updateUserRoleSchema = z.object({ role: z.enum([UserRole.ADMIN, UserRole.USER]) })
