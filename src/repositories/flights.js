import { query } from "../db/pool.js";

// Traer datos del vuelo
async function getFlightById(flightId) {
  const rows = await query(
    `SELECT flight_id, takeoff_date_time, takeoff_airport,
            landing_date_time, landing_airport, airplane_id
            FROM flight
            WHERE flight_id = ?`,
    [flightId]
  );
  return rows[0] || null;
}

// Traer boarding passes + pasajero
async function getPassengersByFlightId(flightId) {
  const rows = await query(
    `SELECT bp.boarding_pass_id, bp.purchase_id, bp.passenger_id,
            bp.seat_type_id, bp.seat_id,
            p.dni, p.name, p.age, p.country
            FROM boarding_pass bp
            JOIN passenger p ON p.passenger_id = bp.passenger_id
            WHERE bp.flight_id = ?`,
    [flightId]
  );
  return rows;
}

export { getFlightById, getPassengersByFlightId };
