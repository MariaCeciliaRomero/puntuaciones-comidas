import mongoose from 'mongoose';

const localSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true
    },

    direccion: {
      type: String,
      required: true
    },

    descripcion: {
      type: String
    }
  },
  {
    collection: 'locales'
  }
);

const Local = mongoose.model('Local', localSchema);

export default Local;