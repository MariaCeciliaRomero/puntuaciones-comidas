import { Router } from 'express';

import {obtenerLocales, crearLocal} from '../controllers/localController.js';

const router = Router();

router.get('/', obtenerLocales);

router.post('/', crearLocal);

export default router;