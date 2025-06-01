import { sequelize } from "../config/database";

const MAX_RETRIES = 10;
const RETRY_DELAY_MS = 3000;

async function repetirProbarConexion() {
  let connected = false;
  let retries = 0;

  while (!connected && retries < MAX_RETRIES) {
    try {
      await sequelize.authenticate();
      console.log(' Conexión exitosa a la base de datos');
      connected = true;
    } catch (err) {
      retries++;
      console.log(`Fallo de conexión. Intento ${retries}/${MAX_RETRIES}`);
      await new Promise(res => setTimeout(res, RETRY_DELAY_MS));
    }
  }

  if (!connected) {
    console.error('No se pudo conectar a la base de datos después de varios intentos');
    process.exit(1);
  }
}

export default repetirProbarConexion;
