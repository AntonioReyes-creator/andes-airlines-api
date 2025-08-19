require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const flightsRouter = require('./routes/flights');
const error = require('./middlewares/error');

const app = express();

app.use(express.json());
app.use(morgan('dev'));

// salud
app.get('/health', (_req, res) => res.json({ status: 'ok' }));

// rutas del ejercicio
app.use('/flights', flightsRouter);

// manejador de errores al final
app.use(error);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`API escuchando en http://localhost:${port}`);
});
