import mongoose from 'mongoose';
import Comida from '../models/Comida.js';
import Local from '../models/Local.js';

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

export const obtenerComidasPorLocal = async (req, res) => {
  try {
    const { localId } = req.params;

    // Validar el identificador
    if (!mongoose.isObjectIdOrHexString(localId)) {
      return res.status(400).json({
        mensaje: 'ID de local inválido'
      });
    }

    // Comprobar que el local exista
    const localExistente = await Local.findById(localId);

    if (!localExistente) {
      return res.status(404).json({
        mensaje: 'El local no existe'
      });
    }

    // Buscar las comidas de ese local
    const comidas = await Comida.find({
      local: localId
    });

    res.status(200).json({
      local: localExistente.nombre,
      totalComidas: comidas.length,
      comidas
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      mensaje: 'Error al obtener las comidas del local'
    });
  }
};