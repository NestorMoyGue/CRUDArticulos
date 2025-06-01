import { Usuario, UsuarioAttributes } from "../models/usuario";

export class UsuarioRepository{
    static async getPorEmail(email: string):Promise<UsuarioAttributes> {
        try {
            const usuario = await Usuario.findOne({
                where: { email }
            });

            return usuario?.dataValues as UsuarioAttributes;
        } catch (error) {
            throw new Error('Error al obtener usuario por email');
        }
    }
}