import dotenv from 'dotenv';
dotenv.config();

import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: Number(process.env.POOL_MAX || 10),
  queueLimit: 0,
  // Mantiene viva la conexión TCP para reducir "server has gone away"
  enableKeepAlive: true,
  keepAliveInitialDelay: 0
});
console.log('🌐 DB_HOST:', process.env.DB_HOST);
console.log('👤 DB_USER:', process.env.DB_USER);
console.log('🔑 DB_PASSWORD:', process.env.DB_PASSWORD);


// Helper de consulta con pequeño retry ante cortes por inactividad
async function query(sql, params = [], retries = 1) {
  try {
    const [rows] = await pool.execute(sql, params);
    return rows;
  } catch (err) {
    const transient = ['PROTOCOL_CONNECTION_LOST', 'ECONNRESET', 'EPIPE'];
    if (
      retries > 0 &&
      (transient.includes(err.code) || /server has gone away/i.test(err.message))
    ) {
      return query(sql, params, retries - 1);
    }
    throw err;
  }
}

export { pool, query };
