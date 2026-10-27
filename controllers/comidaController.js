import Comida from '../models/Comida.js';

export const obtenerComidas = async (req, res) => {
  try {
    const comidas = await Comida.find()
      .populate('local', 'nombre direccion');

    res.json(comidas);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      mensaje: 'Error al obtener las comidas'
    });
  }
};

export const crearComida = async (req, res) => {
  try {
    const { nombre, descripcion, precio, local } = req.body;

    const nuevaComida = await Comida.create({
      nombre,
      descripcion,
      precio,
      local
    });

    res.status(201).json(nuevaComida);

  } catch (error) {
    console.error(error);

    if (error.name === 'ValidationError' ||
        error.name === 'CastError') {
      return res.status(400).json({
        mensaje: 'Datos de la comida no válidos'
      });
    }

    res.status(500).json({
      mensaje: 'Error al crear la comida'
    });
  }
};