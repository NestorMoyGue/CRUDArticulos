import { Sequelize } from 'sequelize-typescript';
import dotenv from 'dotenv';
import models from '../models/exportModels';
import { Articulo } from '../models/articulo';
import { Usuario } from '../models/usuario';
import repetirProbarConexion from '../utils/probarConexion';

dotenv.config();

export const sequelize = new Sequelize({
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 3306,
  dialect: 'mysql',
  models: models,
  logging: false,
});



export const probarConexion = async () => {
  try {
    await repetirProbarConexion()
    await sequelize.sync({ force: false }); 

      const count = await Articulo.count();
    const usuario = await Usuario.count();
    if (count === 0) {
      await Articulo.bulkCreate([
        { nombre: 'Notebook Lenovo', fecha_modif: new Date(), marca: 'Lenovo', estado: true },
        { nombre: 'Impresora HP', fecha_modif: new Date(), marca: 'HP', estado: true },
        { nombre: 'Mouse Logitech', fecha_modif: new Date(), marca: 'Logitech', estado: false },
        { nombre: 'Teclado Redragon', fecha_modif: new Date(), marca: 'Redragon', estado: true },
      ]);
      console.log('Datos iniciales cargados');
    } else {
      console.log('Datos ya existentes, no se cargaron datos nuevos');
    }

    if( usuario === 0) {
      await Usuario.create({
        nombre: 'Administrador',
        email: 'administrador@gmail.com',
        password: '$2a$12$HQfqjVxSB5BxcBIPcEQB3.D0TEccGtRcLxr/YUAVBd7RG5cGjQYgG', 
      })
    }
    console.log('Conexión a la base de datos exitosa.');
  } catch (error) {
    console.error('Error al conectar con la base de datos:', error);
  }
};
