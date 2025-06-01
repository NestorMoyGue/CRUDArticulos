# Imagen base de Node.js
FROM node:18

# Crear y establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar los archivos de dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código
COPY . .

# Exponer el puerto que usa tu app (ajustá si no es 3000)
EXPOSE 3000

# Comando para ejecutar la app
CMD ["npm", "run", "dev"]
