import { Router } from 'express';

import {
  crearPuntuacion,
  obtenerPuntuaciones,
  obtenerPromedio,
  actualizarPuntuacion,
  eliminarPuntuacion,
  obtenerRankingComidas
} from '../controllers/puntuacionController.js';

import { verificarToken } from '../middlewares/authMiddleware.js';

const router = Router();

// Consultar todas las puntuaciones
router.get('/', obtenerPuntuaciones);

// Consultar promedio de una comida
router.get('/promedio/:comidaId', obtenerPromedio);

// Crear una puntuación
router.post('/', verificarToken, crearPuntuacion);

router.get('/ranking', obtenerRankingComidas);

// Actualizar una puntuación
router.put('/:id', verificarToken, actualizarPuntuacion);

router.delete('/:id', verificarToken, eliminarPuntuacion);



export default router;