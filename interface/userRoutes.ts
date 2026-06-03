import express from 'express';
import { authenticateJWT, authorizeRoles } from './authMiddleware';
import { UserRole } from '../domain/models';
import { UserController } from './controllers/UserController';

const router = express.Router();

import { validate } from './middleware/validate'
import { updateUserRoleSchema, idParamSchema } from './validation/schemas'

router.get('/', authenticateJWT, authorizeRoles(UserRole.ADMIN), UserController.list);
router.put('/:id/role', authenticateJWT, authorizeRoles(UserRole.ADMIN), validate(idParamSchema, 'params'), validate(updateUserRoleSchema, 'body'), UserController.updateRole);

// Ejemplo de ruta protegida para cualquier usuario autenticado
router.get('/profile', authenticateJWT, (req, res) => {
  res.json({ user: (req as any).user });
});

export default router;
