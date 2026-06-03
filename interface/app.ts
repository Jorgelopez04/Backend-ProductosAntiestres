import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import userRoutes from './userRoutes';
import authRoutes from './routes/AuthRoutes';
import productRoutes from './routes/ProductRoutes';
import supportRoutes from './routes/SupportRoutes';
import errorHandler from './middleware/errorHandler';

const app = express();

app.use(helmet());
app.set('trust proxy', 1);

app.use(express.json());

// Habilitar CORS en el entrypoint que usa `main.ts` (dev)
app.use(
	cors({
		origin: true,
		methods: ['GET', 'POST', 'PUT', 'DELETE'],
		credentials: true,
	})
);

const globalLimiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	max: 100,
	standardHeaders: true,
	legacyHeaders: false,
	message: { message: 'Too many requests, please try again later.' },
});

const authLimiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	max: 20,
	standardHeaders: true,
	legacyHeaders: false,
	message: { message: 'Too many authentication attempts. Please wait before retrying.' },
});

app.use(globalLimiter);
app.use('/api/v1/auth', authLimiter, authRoutes);
app.use('/api/v1/products', productRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/support', supportRoutes);

// Central error handler (must be last middleware)
app.use(errorHandler);

export default app;