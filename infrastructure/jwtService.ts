import jwt from 'jsonwebtoken'

const envSecret = process.env.JWT_SECRET
if (!envSecret) {
  throw new Error('JWT_SECRET is required. Set JWT_SECRET in your environment or .env file')
}

const JWT_SECRET: string = envSecret

export function generateToken(payload: object): string {
  return jwt.sign(payload as any, JWT_SECRET, {
    expiresIn: '1d',
  })
}

export function verifyToken(token: string) {
  return jwt.verify(token, JWT_SECRET) as any
}