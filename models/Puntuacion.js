import mongoose from 'mongoose';

const puntuacionSchema = new mongoose.Schema(
  {
    usuario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Usuario',
      required: true
    },

    comida: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comida',
      required: true
    },

    valor: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },

    comentario: {
      type: String
    }
  },
  {
    collection: 'puntuaciones',
    timestamps: true
  }
);

// NUEVO: Evitar puntuaciones duplicadas
puntuacionSchema.index(
  { usuario: 1, comida: 1 },
  { unique: true }
);

const Puntuacion = mongoose.model(
  'Puntuacion',
  puntuacionSchema
);

export default Puntuacion;