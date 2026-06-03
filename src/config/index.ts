import dotenv from 'dotenv';

dotenv.config();

export default {
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  jwtSecret: process.env.JWT_SECRET || 'changeme',
  dbUrl: process.env.DATABASE_URL,
};
