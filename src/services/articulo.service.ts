import { Articulo, ArticuloAttributes } from "../models/articulo";
import { ArticuloRepository } from "../repositories/articuloRepository";
import { Errors, NotFoundError } from "../utils/errors";

export class ArticuloService {
    static async get(id: number): Promise<ArticuloAttributes> {
        try {
            let articulo = await ArticuloRepository.get(id);
            if (!articulo) {
                console.log('entro por el no encontro articulo');
                throw new NotFoundError(`Artículo con ID ${id} no encontrado`);
            }
            return articulo;

        } catch (error) {
            if (error instanceof Errors) {
                throw error;
            }
            console.log('no es instancia de...')
            throw new Error(`Error al obtener artículo con ID ${id}`);
        }
    }

    static async getAll(): Promise<ArticuloAttributes[]> {
        try {
            let articulos = await ArticuloRepository.getAll();
            if (!articulos || articulos.length === 0) {
                throw new NotFoundError("No se encontraron artículos");
            }
            return articulos;
        } catch (error) {
            throw new Error("Error al obtener todos los artículos");
        }
    }

    static async getByEstado(estado: boolean): Promise<ArticuloAttributes[]> {
        try {
            let articulos = await ArticuloRepository.getByEstado(estado);
            if (!articulos || articulos.length === 0) {
                throw new NotFoundError("No se encontraron artículos");
            }

            return articulos;
        } catch (error) {
            if (error instanceof Errors) {
                throw error;
            }
            throw new Error(`Error al obtener artículos por estado ${estado}`);
        }
    }

    static async insert(data: ArticuloAttributes): Promise<ArticuloAttributes> {
        try {
            let nuevoArticulo = await ArticuloRepository.insert(data);
            if (!nuevoArticulo) {
                throw new Error("No se pudo crear el artículo");
            }
            return nuevoArticulo;
        } catch (error) {
            if (error instanceof Errors) {
                throw error;
            }
            throw new Error("Error al insertar artículo");
        }
    }

    static async update(data: ArticuloAttributes, id: number): Promise<ArticuloAttributes> {
        try {
            let articulo = await ArticuloRepository.get(id);
            if (!articulo) {
                throw new NotFoundError(`Artículo con ID ${id} no encontrado`);
            }

            let updatedCount = await ArticuloRepository.update(data);
            if (updatedCount === 0) {
                throw new Error(`No se pudo actualizar el artículo con ID ${id}`);
            }

            let articuloActualizado = await ArticuloRepository.get(id);
            if (!articuloActualizado) {
                throw new NotFoundError(`Artículo con ID ${id} no encontrado después de la actualización`);
            }
            return articuloActualizado;
        } catch (error) {
            if (error instanceof Errors) {
                throw error;
            }
            throw new Error(`Error al actualizar artículo con ID ${id}`);
        }
    }


    static async darDeBaja(id: number): Promise<void> {
        try {
            let articulo = await ArticuloRepository.get(id);
            if (!articulo) {
                throw new Error(`Artículo con ID ${id} no encontrado`);
            }
            articulo.estado = false;
            await this.update(articulo, id);
            return;
        } catch (error) {
            if (error instanceof Errors) {
                throw error;
            }
            throw new Error(`Error al dar de baja el artículo con ID ${id}`);
        }
    }
}