import bcrypt from 'bcryptjs';
import { UsuarioService } from './usuario.service';
import { generarToken } from '../utils/jwt';

export class AuthService {
    static async login(email: string, password: string): Promise<string> {
        try {
            const usuario = await UsuarioService.getPorEmail(email);

            if (!usuario) {
                throw new Error('Email o contraseña incorrectos');
            }

            const passwordValido = await bcrypt.compare(password, usuario.password);
            if (!passwordValido) {
                throw new Error('Email o contraseña incorrectos');
            }

            const token = generarToken({ id: usuario.id, email: usuario.email });
            return token;

        } catch (error) {
            console.error('Error en el proceso de login:', error);
            throw new Error('Error en el proceso de login');
        }
    }
}
