import { Router } from 'express';
import {registrarUsuario, iniciarSesion} from '../controllers/usuarioController.js';
import { verificarToken } from '../middlewares/authMiddleware.js';

const router = Router();

router.post('/registro', registrarUsuario);
router.post('/login', iniciarSesion);

router.get('/perfil', verificarToken, (req, res) => {
  res.json({
    mensaje: 'Acceso autorizado',
    usuarioId: req.usuario.id
  });
});

export default router;