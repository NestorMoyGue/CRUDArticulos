# CRUD de Artículos con Node.js, TypeScript, Sequelize y MySQL

Este proyecto es una API RESTful para gestionar artículos, desarrollada con Node.js, TypeScript, Sequelize y MySQL. La autenticación se realiza mediante JWT, y el entorno está configurado para ejecutarse con Docker y Docker Compose.

## 📦 Requisitos

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

## 🚀 Levantar el entorno con Docker

Desde la raíz del proyecto, ejecutá:

```bash
docker-compose up --build




Se debe completar el archivo .env con los datos mostrados en example.env, este al ser un proyecto publico el .env es igual al #example.env
PW para el JWT igual a la del .env

El node modules esta vacio porque se ejecuta en el contenedor de docker, para evitar errores en el editor pueden instalarlos localmente.


##