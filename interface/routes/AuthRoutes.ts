import { Router } from 'express'
import { AuthController } from '../controllers/AuthController'
import { validate } from '../middleware/validate'
import { registerSchema, loginSchema } from '../validation/schemas'

const router = Router()

router.post('/register', validate(registerSchema, 'body'), AuthController.register)
router.post('/login', validate(loginSchema, 'body'), AuthController.login)

export default router
