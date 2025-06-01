// src/index.ts
import express from 'express';
import articuloRoutes from './routes/articulos.routes';
import authRoutes from './routes/auth.routes';
import { probarConexion } from './config/database';
import swaggerUi from 'swagger-ui-express';
import dotenv from 'dotenv';
import fs from 'fs';
import yaml from 'js-yaml';
import path from 'path';


dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

const swaggerDocument = yaml.load(
  fs.readFileSync(path.join(__dirname, './docs/swagger.yaml'), 'utf8')
) as object; 

app.use(express.json());
app.use('/auth', authRoutes)
app.use('/articulo', articuloRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/', (req, res) => {
  res.redirect('/api-docs');
});


probarConexion();

app.listen(PORT, () => {
  console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`);
});
