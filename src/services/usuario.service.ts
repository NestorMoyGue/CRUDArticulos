import { UsuarioAttributes } from "../models/usuario";
import { UsuarioRepository } from "../repositories/usuarioRepository";

export class UsuarioService {
    static async getPorEmail(email: string):Promise<UsuarioAttributes> {
        try {
            let usuario = await UsuarioRepository.getPorEmail(email);
            if(!usuario) {
                throw new Error(`Usuario con email ${email} no encontrado`);
            }
            return usuario;
        } catch (error) {
            console.error('Error al obtener usuario por email:', error);
            throw new Error('Error al obtener usuario por email');
        }
    }
}