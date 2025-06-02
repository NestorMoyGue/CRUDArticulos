import { Request, Response } from 'express';
import { ArticuloService } from '../services/articulo.service';
import { BadRequestError, Errors } from '../utils/errors';



export async function get(req: Request, res: Response) {
    try {
        const id = Number(req.params.id);
        // si bien el id no es 0  en la mayoría de los casos, uso el isNaN para que el 0 sea tomado como un id válido
        if (isNaN(id)) {
             throw new BadRequestError('ID del artículo es requerido y debe ser un número');
        }
        const articulo = await ArticuloService.get(id);
        res.status(200).json(articulo);

    } catch (error) {
        console.error('Error al obtener el artículo:', error);
        if (error instanceof Errors) {
            return res.status(error.statusCode).json({ message: error.message });
        } else {
            console.error('Error desconocido:', error);
            res.status(500).json({ message: 'Error desconocido' });
        }
    }
}

export async function getAll(req: Request, res: Response) {
    try {
        const articulos = await ArticuloService.getAll();
        res.status(200).json(articulos);
    } catch (error) {
        if (error instanceof Errors) {
            return res.status(error.statusCode).json({ message: error.message });
        } else {
            console.error('Error desconocido:', error);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
    }
}


export async function getByEstado(req: Request, res: Response) {
    try {
        const estado = req.params.estado;
        if (estado === undefined) {
            throw new BadRequestError('Estado es requerido');
        }
        if (estado.toString().toLowerCase() != 'true' && estado.toString().toLowerCase() != 'false') {
            throw new BadRequestError('Estado debe ser "true" o "false"');
        }
        let estadoBuscado: boolean = estado.toLowerCase() === 'true' ? true : false;

        const articulos = await ArticuloService.getByEstado(estadoBuscado);
        res.status(200).json(articulos);
    } catch (error) {
        if (error instanceof Errors) {
            return res.status(error.statusCode).json({ message: error.message });
        } else {
            console.error('Error desconocido:', error);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
    }
}

export async function getByNombre(req: Request, res: Response) {
    try {
        const nombre = req.params.nombre;
        if (nombre === undefined) {
            throw new BadRequestError('Estado es requerido');
        }
        const articulo = await ArticuloService.getByNombre(nombre);
        console.log('resultado del controller: ', articulo)
        res.status(200).json(articulo);
    } catch (error) {
        if (error instanceof Errors) {
            return res.status(error.statusCode).json({ message: error.message });
        } else {
            console.error('Error desconocido:', error);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
    }
}




export async function insert(req: Request, res: Response) {
    try {
        let nombre = req.body.nombre;
        let marca = req.body.marca;
        let estado = req.body.estado;
        if (!nombre || !marca) {
            throw new BadRequestError('Nombre y marca son requeridos');
        }
        if (estado.toString().toLowerCase() != 'true' && estado.toString().toLowerCase() != 'false') {
            throw new BadRequestError('Estado debe ser "true" o "false"');
        }
   

        let objArticulo = {
            nombre: req.body.nombre,
            fecha_modif: new Date(),
            marca: req.body.marca,
            estado: req.body.estado
        }

        const articulo = await ArticuloService.insert(objArticulo);
        res.status(201).json(articulo);

    } catch (error) {
        console.error('Error al insertar el artículo:', error);
        if (error instanceof Errors) {
            return res.status(error.statusCode).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'Error interno del servidor' });
        }

    }
}


export async function update(req: Request, res: Response) {
    try {
        const id = Number(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'ID del artículo es requerido y debe ser un numero' });
        }
        if (id != req.body.id) {
            return res.status(400).json({ message: 'ID del artículo en la URL y en el cuerpo de la solicitud deben coincidir' });
        }
    
        let objArticulo = {
            id: req.body.id,
            nombre: req.body.nombre,
            fecha_modif: new Date(),
            marca: req.body.marca,
            estado: req.body.estado
        }
        const articulo = await ArticuloService.update(objArticulo, id);
        res.status(200).json(articulo);
    } catch (error) {
        console.error('Error al actualizar el articulo:', error);
        if (error instanceof Errors) {
            return res.status(error.statusCode).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'Error interno del servidor' });
        }
    }
}


export async function darDeBaja(req: Request, res: Response) {
    try {
        const id = Number(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'ID del artículo es requerido y debe ser un numero' });
        }
        await ArticuloService.darDeBaja(id);
        res.status(200).json({ message: `Artículo con ID ${id} dado de baja.` });
    } catch (error) {
        console.error('Error al dar de baja el artículo:', error);
        if (error instanceof Errors) {
            return res.status(error.statusCode).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'Error interno del servidor' });
        }
    }
}