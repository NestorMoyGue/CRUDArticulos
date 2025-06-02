import { Articulo, ArticuloAttributes } from "../models/articulo";

export class ArticuloRepository{
    static async get(id: number): Promise<ArticuloAttributes> {
       try {
         let articulo = await Articulo.findByPk(id);
         return articulo?.dataValues as ArticuloAttributes;
       } catch (error) {
        console.log('tira errror aca no se porque ', error)
         throw new Error(`Error al obtener artículo con ID ${id}`);
       }
    }


    static async getAll(): Promise<ArticuloAttributes[]> {
        try {
          let articulos = await Articulo.findAll();
          return articulos;
        } catch (error) {
          throw new Error("Error al obtener todos los artículos");
        }
    }


    static async getByEstado(estado: boolean): Promise<ArticuloAttributes[]> {
        try {
          let articulos = await Articulo.findAll({ where: { estado } });
          return articulos;
        } catch (error) {
          throw new Error(`Error al obtener artículos por estado ${estado}`);
        }
    }


    
    static async getByNombre(nombre: string): Promise<ArticuloAttributes> {
        try {
          let articulo = await Articulo.findOne({ where: { nombre } });
          return articulo?.dataValues as ArticuloAttributes
        } catch (error) {
          throw new Error(`Error al obtener artículos por nombre:  ${nombre}`);
        }
    }

    static async insert(data: ArticuloAttributes): Promise<ArticuloAttributes> {
        try {
          let nuevoArticulo = await Articulo.create(data);
          return nuevoArticulo.dataValues;
        } catch (error) {
          throw new Error("Error al insertar artículo");
        }
    }

    static async update(data: ArticuloAttributes): Promise<number> {
      try {
        const [updatedCount] = await Articulo.update(data, {where: { id: data.id } });
        return updatedCount
      } catch (error) {
        throw new Error(`Error al actualizar artículo con ID ${data.id}`);
      }
    }


}