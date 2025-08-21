import dotenv from 'dotenv';
dotenv.config();

import { query } from './src/db/pool.js';

(async () => {
  try {
    console.log(' Probando conexión con la BD...');

    // 1. Seleccionar la base de datos actual
    const [db] = await query('SELECT DATABASE() AS db');
    console.log(' Base de datos activa:', db.db);

    // 2. Verificar que existen las tablas
    const tables = await query('SHOW TABLES;');
    console.log(' Tablas encontradas:');
    tables.forEach((t) => console.log(Object.values(t)[0]));

    // 3. Contar vuelos
    const [countFlights] = await query('SELECT COUNT(*) AS total FROM flight;');
    console.log(' Total de vuelos:', countFlights.total);

    // 4. Mostrar un pasajero ejemplo
    const [passenger] = await query('SELECT passenger_id, name, country FROM passenger LIMIT 1;');
    console.log(' Ejemplo de pasajero:', passenger);

    process.exit(0);
  } catch (err) {
    console.error(' Error al conectar:', err.message);
    process.exit(1);
  }
})();
