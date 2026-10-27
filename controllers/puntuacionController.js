
import mongoose from 'mongoose';
import Puntuacion from '../models/Puntuacion.js';
import Comida from '../models/Comida.js';

// =====================================
// 1. CREAR UNA PUNTUACIÓN
// =====================================

export const crearPuntuacion = async (req, res) => {
  try {
    const { comida, valor, comentario } = req.body;

    const usuario = req.usuario.id;

    // Validar el identificador de la comida
    if (!mongoose.isObjectIdOrHexString(comida)) {
      return res.status(400).json({
        mensaje: 'ID de comida inválido'
      });
    }

    // Validar el valor de la puntuación
    if (!Number.isInteger(valor) || valor < 1 || valor > 5) {
      return res.status(400).json({
        mensaje: 'La puntuación debe ser un entero entre 1 y 5'
      });
    }

    // Comprobar que la comida exista
    const comidaExistente = await Comida.findById(comida);

    if (!comidaExistente) {
      return res.status(404).json({
        mensaje: 'La comida no existe'
      });
    }

    // Crear la puntuación
    const nuevaPuntuacion = await Puntuacion.create({
      usuario,
      comida,
      valor,
      comentario
    });

    // Responder con la puntuación creada
    res.status(201).json({
      mensaje: 'Puntuación registrada correctamente',
      puntuacion: nuevaPuntuacion
    });

  } catch (error) {
    console.error(error);

    // NUEVO: Manejar puntuaciones duplicadas
    if (error.code === 11000) {
      return res.status(409).json({
        mensaje: 'Ya puntuaste esta comida'
      });
    }

    // Manejar otros errores
    res.status(500).json({
      mensaje: 'Error al registrar la puntuación'
    });
  }
};

// =====================================
// 2. OBTENER TODAS LAS PUNTUACIONES
// =====================================

export const obtenerPuntuaciones = async (req, res) => {
  try {
    const puntuaciones = await Puntuacion.find()
      .populate('usuario', 'nombre')
      .populate('comida', 'nombre precio');

    res.json(puntuaciones);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      mensaje: 'Error al obtener las puntuaciones'
    });
  }
};

// =====================================
// 3. OBTENER EL PROMEDIO DE UNA COMIDA
// =====================================

export const obtenerPromedio = async (req, res) => {
  try {
    const { comidaId } = req.params;

    // Validar el identificador de la comida
    if (!mongoose.isObjectIdOrHexString(comidaId)) {
      return res.status(400).json({
        mensaje: 'ID de comida inválido'
      });
    }

    // Comprobar que la comida exista
    const comidaExistente = await Comida.findById(comidaId);

    if (!comidaExistente) {
      return res.status(404).json({
        mensaje: 'La comida no existe'
      });
    }

    // Calcular el promedio de puntuaciones
    const resultado = await Puntuacion.aggregate([
      {
        $match: {
          comida: new mongoose.Types.ObjectId(comidaId)
        }
      },
      {
        $group: {
          _id: '$comida',
          promedio: { $avg: '$valor' },
          totalPuntuaciones: { $sum: 1 }
        }
      }
    ]);

    // Enviar los resultados
    res.json({
      comida: comidaExistente.nombre,
      promedio: resultado[0]?.promedio ?? null,
      totalPuntuaciones: resultado[0]?.totalPuntuaciones ?? 0
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      mensaje: 'Error al calcular el promedio'
    });
  }
};

// =====================================
// 4. ACTUALIZAR UNA PUNTUACIÓN
// =====================================

export const actualizarPuntuacion = async (req, res) => {
  try {
    const { id } = req.params;
    const { valor, comentario } = req.body;

    const usuario = req.usuario.id;

    // Validar el identificador de la puntuación
    if (!mongoose.isObjectIdOrHexString(id)) {
      return res.status(400).json({
        mensaje: 'ID de puntuación inválido'
      });
    }

    // Validar el valor
    if (!Number.isInteger(valor) || valor < 1 || valor > 5) {
      return res.status(400).json({
        mensaje: 'La puntuación debe ser un entero entre 1 y 5'
      });
    }

    // Validar el comentario, si fue enviado
    if (comentario !== undefined && typeof comentario !== 'string') {
      return res.status(400).json({
        mensaje: 'El comentario debe ser un texto'
      });
    }

    // Buscar la puntuación
    const puntuacion = await Puntuacion.findById(id);

    if (!puntuacion) {
      return res.status(404).json({
        mensaje: 'La puntuación no existe'
      });
    }

    // Comprobar que pertenece al usuario autenticado
    if (puntuacion.usuario.toString() !== usuario.toString()) {
      return res.status(403).json({
        mensaje: 'No tenés permiso para modificar esta puntuación'
      });
    }

    // Actualizar los datos
    puntuacion.valor = valor;

    if (comentario !== undefined) {
      puntuacion.comentario = comentario;
    }

    // Guardar los cambios
    await puntuacion.save();

    res.status(200).json({
      mensaje: 'Puntuación actualizada correctamente',
      puntuacion
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      mensaje: 'Error al actualizar la puntuación'
    });
  }
};

// =====================================
// 5. ELIMINAR UNA PUNTUACIÓN
// =====================================

export const eliminarPuntuacion = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = req.usuario.id;

    // Validar el ID
    if (!mongoose.isObjectIdOrHexString(id)) {
      return res.status(400).json({
        mensaje: 'ID de puntuación inválido'
      });
    }

    // Buscar la puntuación
    const puntuacion = await Puntuacion.findById(id);

    if (!puntuacion) {
      return res.status(404).json({
        mensaje: 'La puntuación no existe'
      });
    }

    // Comprobar que pertenece al usuario
    if (puntuacion.usuario.toString() !== usuario.toString()) {
      return res.status(403).json({
        mensaje: 'No tenés permiso para eliminar esta puntuación'
      });
    }

    // Eliminar el documento
    await puntuacion.deleteOne();

    res.status(200).json({
      mensaje: 'Puntuación eliminada correctamente'
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      mensaje: 'Error al eliminar la puntuación'
    });
  }
};