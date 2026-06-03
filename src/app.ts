import express from 'express';
import cors from './interface/middleware/cors';
import errorHandler from './interface/middleware/errorHandler';
import healthRoutes from './interface/routes/health';
import routes from '../interface/routes';
import { config } from 'dotenv';

config();

const app = express();

app.use(express.json());
app.use(cors);

app.use('/health', healthRoutes);
app.use(routes);

app.use(errorHandler);

export default app;
