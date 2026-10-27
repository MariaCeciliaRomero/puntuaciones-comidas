import Local from '../models/Local.js';

// Obtener todos los locales
export const obtenerLocales = async (req, res) => {
  try {
    const locales = await Local.find();

    res.json(locales);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      mensaje: 'Error al obtener los locales'
    });
  }
};

// Crear un nuevo local
export const crearLocal = async (req, res) => {
  try {
    const { nombre, direccion, descripcion } = req.body;

    const nuevoLocal = await Local.create({
      nombre,
      direccion,
      descripcion
    });

    res.status(201).json(nuevoLocal);
  } catch (error) {
    console.error(error);

    if (error.name === 'ValidationError') {
      return res.status(400).json({
        mensaje: 'Los datos del local no son válidos'
      });
    }

    res.status(500).json({
      mensaje: 'Error al crear el local'
    });
  }
};