import { Router } from 'express'
import { ProductController } from '../controllers/ProductController'
import { authenticateJWT, authorizeRoles } from '../authMiddleware'
import { UserRole } from '../../domain/models'
import { validate } from '../middleware/validate'
import { createProductSchema, updateProductSchema, idParamSchema, getProductsQuerySchema } from '../validation/schemas'

const router = Router()

router.get('/', validate(getProductsQuerySchema, 'query'), ProductController.list)
router.get('/:id', validate(idParamSchema, 'params'), ProductController.getById)
router.post('/', authenticateJWT, authorizeRoles(UserRole.ADMIN), validate(createProductSchema, 'body'), ProductController.create)
router.put('/:id', authenticateJWT, authorizeRoles(UserRole.ADMIN), validate(idParamSchema, 'params'), validate(updateProductSchema, 'body'), ProductController.update)
router.delete('/:id', authenticateJWT, authorizeRoles(UserRole.ADMIN), validate(idParamSchema, 'params'), ProductController.delete)

export default router
