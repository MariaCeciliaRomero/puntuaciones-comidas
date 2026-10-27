import mongoose from 'mongoose';

const conectarDB = async () => {
  try {
    await mongoose.connect(
      'mongodb://127.0.0.1:27017/puntuaciones_comidas'
    );

    console.log('MongoDB conectado correctamente');
  } catch (error) {
    console.error('Error al conectar MongoDB:', error);
    throw error;
  }
};

export default conectarDB;