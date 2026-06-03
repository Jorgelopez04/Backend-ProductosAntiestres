import { Router } from 'express';
import authRoutes from './AuthRoutes';

const router = Router();

router.use('/api/v1/auth', authRoutes);

export default router;
