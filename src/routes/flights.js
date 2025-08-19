const express = require('express');
const router = express.Router();
const { getFlightById, getPassengersByFlightId } = require('../repositories/flights');
const { getSeatsByAirplaneId } = require('../services/seatAssignment');
const { assignSeats } = require('../services/assignPassengers');
const { keysToCamel } = require('../utils/case');

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

module.exports = router;
