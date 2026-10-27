import { Router } from 'express';
import {obtenerLocales, crearLocal} from '../controllers/localController.js';
import { obtenerComidasPorLocal } from '../controllers/comidaController.js';

const router = Router();

router.get('/', obtenerLocales);
router.post('/', crearLocal);
router.get('/:localId/comidas', obtenerComidasPorLocal);

export default router;