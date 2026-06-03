import jwt from 'jsonwebtoken';
import config from '../../config';

export function generateToken(payload: object): string {
  return jwt.sign(payload, config.jwtSecret, { expiresIn: '1d' });
}

export function verifyToken(token: string): any {
  return jwt.verify(token, config.jwtSecret);
}
