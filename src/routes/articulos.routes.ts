import { Router } from 'express';
import { darDeBaja, get, getAll, getByEstado, insert, update } from '../controllers/articulo.controller';
import catchAsyncErrors from '../middlewares/catchAsyncErrors';
import { autenticarJWT } from '../middlewares/authMiddleware';


const router = Router();

router.get('/',autenticarJWT ,catchAsyncErrors(getAll));
router.get('/:id', autenticarJWT, catchAsyncErrors(get));
router.get('/estado/:estado', autenticarJWT, catchAsyncErrors(getByEstado)); 
router.post('/new', autenticarJWT, catchAsyncErrors(insert)); 
router.put('/:id', autenticarJWT, catchAsyncErrors(update));
router.delete('/:id', autenticarJWT, catchAsyncErrors(darDeBaja)); 



export default router;
