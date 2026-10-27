import mongoose from 'mongoose';

const comidaSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true
    },

    descripcion: {
      type: String
    },

    precio: {
      type: Number,
      required: true,
      min: 0
    },

    local: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Local',
      required: true
    }
  },
  {
    collection: 'comidas'
  }
);

const Comida = mongoose.model('Comida', comidaSchema);

export default Comida;