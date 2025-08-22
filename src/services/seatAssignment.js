import { query } from '../db/pool.js';

// Obtener todos los asientos del avión (por clase 1-primium-ec)
async function getSeatsByAirplaneId(airplaneId) {
  const rows = await query(
    `SELECT seat_id, seat_column, seat_row, seat_type_id
            FROM seat
            WHERE airplane_id = ?
            ORDER BY seat_row ASC, seat_column ASC`,
            [airplaneId]
  );
  return rows;
}

// Detectar bloques de asientos en cada fila (sirve para saber qué es contiguo)
function buildSeatMap(seats) {
  const seatMap = {};

  seats.forEach((s) => {
    const row = s.seat_row;
    if (!seatMap[row]) seatMap[row] = [];
    seatMap[row].push(s);
  });

  // Ordenamos por columna dentro de cada fila
  for (const row in seatMap) {
    seatMap[row].sort((a, b) => a.seat_column.localeCompare(b.seat_column));
  }

  return seatMap;
}

// Chequear si dos asientos son contiguos en la misma fila ( A-B o E-F)
function areAdjacent(seatA, seatB) {
  if (seatA.seat_row !== seatB.seat_row) return false;
  const colA = seatA.seat_column.charCodeAt(0);
  const colB = seatB.seat_column.charCodeAt(0);
  return Math.abs(colA - colB) === 1;}

export { getSeatsByAirplaneId, buildSeatMap, areAdjacent };
