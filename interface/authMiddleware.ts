import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../infrastructure/jwtService';
import { UserRole } from '../domain/models';

export function authenticateJWT(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      message: 'No token provided',
    });
  }

  const token = authHeader.split(' ')[1];

  try {
    const payload = verifyToken(token);

    // @ts-ignore
    req.user = payload;

    next();
  } catch {
    return res.status(401).json({
      message: 'Invalid token',
    });
  }
}

export function authorizeRoles(...roles: UserRole[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    // @ts-ignore
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({
        message: 'Forbidden',
      });
    }

    next();
  };
}