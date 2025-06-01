import express from 'express';
import { probarConexion } from './config/database';

const app = express();
app.use(express.json());

probarConexion();

export default app;
