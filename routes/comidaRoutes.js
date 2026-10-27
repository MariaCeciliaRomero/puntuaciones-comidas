import { Router } from 'express';
import { obtenerComidas, crearComida } from '../controllers/comidaController.js';

const router = Router();

router.get('/', obtenerComidas);
router.post('/', crearComida);

export default router;