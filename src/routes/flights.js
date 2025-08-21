import { Router } from 'express';
import { getFlightById, getPassengersByFlightId } from '../repositories/flights.js';
import { getSeatsByAirplaneId } from '../services/seatAssignment.js';
import { assignSeats } from '../services/assignPassengers.js';
import { keysToCamel } from '../utils/case.js';

const router = Router();

// GET /flights/:id/passengers
router.get('/:id/passengers', async (req, res, next) => {
  try {
    const flightId = Number(req.params.id);

    // 1) Buscar vuelo
    const flight = await getFlightById(flightId);
    if (!flight) {
      return res.status(404).json({ code: 404, data: {} });
    }

    // 2) Buscar pasajeros con boarding passes
    let passengers = await getPassengersByFlightId(flightId);
    const seats = await getSeatsByAirplaneId(flight.airplane_id);

    // Asignar asientos (respetando existentes)
    passengers = assignSeats(passengers, seats);

    // 3) Convertir a camelCase (vuelo + pasajeros)
    const flightCamel = keysToCamel(flight);
    const passengersCamel = keysToCamel(passengers);

    // 4) Respuesta con la estructura exacta
    return res.json({
      code: 200,
      data: {
        flightId: flightCamel.flightId,
        takeoffDateTime: flightCamel.takeoffDateTime,
        takeoffAirport: flightCamel.takeoffAirport,
        landingDateTime: flightCamel.landingDateTime,
        landingAirport: flightCamel.landingAirport,
        airplaneId: flightCamel.airplaneId,
        passengers: passengersCamel.map((p) => ({
          passengerId: p.passengerId,
          dni: p.dni,
          name: p.name,
          age: p.age,
          country: p.country,
          boardingPassId: p.boardingPassId,
          purchaseId: p.purchaseId,
          seatTypeId: p.seatTypeId,
          seatId: p.seatId
        }))
      }
    });
  } catch (err) {
    next(err);
  }
});

export default router;
