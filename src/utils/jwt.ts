import jwt from 'jsonwebtoken';

export function getClaveSecreta(): string {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET no está definida en las variables de entorno');
  }
  return secret;
}

export function generarToken(payload: object): string {
  return jwt.sign(payload, getClaveSecreta(), { expiresIn: '1h' });
}

export function verificarToken(token: string): object | string {
  return jwt.verify(token, getClaveSecreta());
}
