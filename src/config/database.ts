import { Sequelize } from 'sequelize-typescript';
import dotenv from 'dotenv';
import models from '../models/exportModels';

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
    await sequelize.authenticate();
    await sequelize.sync({ force: false }); 
    console.log('✅ Conexión a la base de datos exitosa.');
  } catch (error) {
    console.error('❌ Error al conectar con la base de datos:', error);
  }
};
