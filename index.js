import express from 'express';
import localRoutes from './routes/localRoutes.js';
import comidaRoutes from './routes/comidaRoutes.js';
import usuarioRoutes from './routes/usuarioRoutes.js';
import puntuacionRoutes from './routes/puntuacionRoutes.js';
import conectarDB from './config/db.js';
import 'dotenv/config';

const app = express();

const PORT = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Bienvenido a la API de puntuaciones de comidas');
});

app.use('/api/locales', localRoutes);
app.use('/api/comidas', comidaRoutes);
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/puntuaciones', puntuacionRoutes);

const iniciarServidor = async () => {
  try {
    await conectarDB();

    app.listen(PORT, () => {
      console.log(`Servidor funcionando en el puerto ${PORT}`);
    });
  } catch (error) {
    console.error('No se pudo iniciar el servidor');
    process.exit(1);
  }
};

iniciarServidor();