import { Router } from 'express'
import { SupportController } from '../controllers/SupportController'
import { authenticateJWT, authorizeRoles } from '../authMiddleware'
import { UserRole } from '../../domain/models'
import { validate } from '../middleware/validate'
import { createSupportSchema, updateSupportSchema, idParamSchema } from '../validation/schemas'

const router = Router()

router.post('/', validate(createSupportSchema, 'body'), SupportController.create)
router.get('/', authenticateJWT, authorizeRoles(UserRole.ADMIN), SupportController.list)
router.get('/:id', authenticateJWT, authorizeRoles(UserRole.ADMIN), validate(idParamSchema, 'params'), SupportController.getById)
router.put('/:id/read', authenticateJWT, authorizeRoles(UserRole.ADMIN), validate(idParamSchema, 'params'), SupportController.markRead)
router.put('/:id', authenticateJWT, authorizeRoles(UserRole.ADMIN), validate(idParamSchema, 'params'), validate(updateSupportSchema, 'body'), SupportController.update)
router.delete('/:id', authenticateJWT, authorizeRoles(UserRole.ADMIN), validate(idParamSchema, 'params'), SupportController.delete)

export default router
