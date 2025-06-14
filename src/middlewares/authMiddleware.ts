import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { getClaveSecreta } from '../utils/jwt';


export function autenticarJWT(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;


  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ message: 'No autorizado: token no proporcionado' });
    return
  }

  const token = authHeader.split(' ')[1];

  try {
    const payload = jwt.verify(token, getClaveSecreta());
    (req as any).user = payload;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token inválido o expirado' });
    return;
  }
}
