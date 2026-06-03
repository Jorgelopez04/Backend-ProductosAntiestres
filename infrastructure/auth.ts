import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserRole } from '../domain/models';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';

export function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export function comparePassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export function generateJWT(user: { id: string; role: UserRole }): string {
  return jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
}

export function verifyJWT(token: string): any {
  return jwt.verify(token, JWT_SECRET);
}
