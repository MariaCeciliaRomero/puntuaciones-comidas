import Usuario from '../models/Usuario.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const registrarUsuario = async (req, res) => {
  try {
    const { nombre, email, password } = req.body;

    // Comprobar que los campos estén completos
    if (!nombre || !email || !password) {
      return res.status(400).json({
        mensaje: 'Todos los campos son obligatorios'
      });
    }

    // Comprobar si el usuario ya existe
    const usuarioExistente = await Usuario.findOne({
      email: email.trim().toLowerCase()
    });

    if (usuarioExistente) {
      return res.status(409).json({
        mensaje: 'El correo ya está registrado'
      });
    }

    // Generar el hash de la contraseña
    const passwordHash = await bcrypt.hash(password, 12);

    // Guardar el usuario en MongoDB
    const nuevoUsuario = await Usuario.create({
      nombre,
      email,
      password: passwordHash
    });

    // Devolver una respuesta sin la contraseña
    res.status(201).json({
      mensaje: 'Usuario registrado correctamente',
      usuario: {
        id: nuevoUsuario._id,
        nombre: nuevoUsuario.nombre,
        email: nuevoUsuario.email
      }
    });

  } catch (error) {
    console.error(error);

    if (error.code === 11000) {
      return res.status(409).json({
        mensaje: 'El correo ya está registrado'
      });
    }

    res.status(500).json({
      mensaje: 'Error al registrar usuario'
    });
  }
};

export const iniciarSesion = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Comprobar que se enviaron ambos campos
    if (!email || !password) {
      return res.status(400).json({
        mensaje: 'Email y contraseña son obligatorios'
      });
    }

    // Buscar al usuario por su correo
    const usuario = await Usuario.findOne({
      email: email.trim().toLowerCase()
    }).select('+password');

    // Comprobar si existe
    if (!usuario) {
      return res.status(401).json({
        mensaje: 'Credenciales incorrectas'
      });
    }

    // Comparar la contraseña con el hash
    const passwordCorrecta = await bcrypt.compare(
      password,
      usuario.password
    );

    if (!passwordCorrecta) {
      return res.status(401).json({
        mensaje: 'Credenciales incorrectas'
      });
    }

    const token = jwt.sign(
      { id: usuario._id.toString() },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Responder sin incluir el hash
    res.status(200).json({
      mensaje: 'Inicio de sesión correcto',
      token,
      usuario: {
        id: usuario._id,
        nombre: usuario.nombre,
        email: usuario.email
      }
    });

  } catch (error) {
    console.error('Error al iniciar sesión:', error);

    res.status(500).json({
      mensaje: 'Error interno del servidor'
    });
  }
};