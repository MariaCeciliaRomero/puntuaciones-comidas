import jwt from 'jsonwebtoken';

export const verificarToken = (req, res, next) => {
  try {
    const autorizacion = req.headers.authorization;

    if (!autorizacion) {
      return res.status(401).json({
        mensaje: 'Token no proporcionado'
      });
    }

    const partes = autorizacion.split(' ');

    if (
      partes.length !== 2 ||
      partes[0] !== 'Bearer' ||
      !partes[1]
    ) {
      return res.status(401).json({
        mensaje: 'Formato de token inválido'
      });
    }

    const token = partes[1];

    const datos = jwt.verify(
      token,
      process.env.JWT_SECRET,
      { algorithms: ['HS256'] }
    );

    req.usuario = { id: datos.id };

    next();

  } catch (error) {
    console.error('Error de autenticación:', error.message);

    return res.status(401).json({
      mensaje: 'Token inválido o expirado'
    });
  }
};