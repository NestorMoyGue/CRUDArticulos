import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email y contraseña son requeridos' });
  }

  try {
    const token = await AuthService.login(email, password);
    res.json({ token });
  } catch (error) {
    console.error('Error en login:', error);
    res.status(401).json({ message: error instanceof Error ? error.message : 'No autorizado' });
  }
}
