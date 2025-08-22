import dotenv from 'dotenv';
dotenv.config();

import express, { json } from 'express';
import morgan from 'morgan';
import flightsRouter from './routes/flights.routes.js';
import error from './middlewares/error.js';

const app = express();

app.use(json());
app.use(morgan('dev'));

// salud
app.get('/health', (req, res) => res.json({ status: 'oki doki' }));

// rutas del ejercicio
app.use('/flights', flightsRouter);

// manejador de errores al final
app.use(error);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`API escuchando en http://localhost:${port}`);
});
