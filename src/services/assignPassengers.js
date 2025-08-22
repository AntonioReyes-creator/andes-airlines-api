import { buildSeatMap, areAdjacent } from "./seatAssignment.js";

// Asigna asientos a pasajeros de un vuelo
function assignSeats(passengers, seats) {
  // Separar ocupados y libres
  const occupiedSeatIds = new Set(
    passengers.filter((p) => p.seat_id).map((p) => p.seat_id)
  );
  const freeSeats = seats.filter((s) => !occupiedSeatIds.has(s.seat_id));

  // Agrupar pasajeros por clase
  const passengersByClass = {};
  passengers.forEach((p) => {
    if (!passengersByClass[p.seat_type_id])
      passengersByClass[p.seat_type_id] = [];
    passengersByClass[p.seat_type_id].push(p);
  });

  // Agrupar asientos por clase
  const seatsByClass = {};
  seats.forEach((s) => {
    if (!seatsByClass[s.seat_type_id]) seatsByClass[s.seat_type_id] = [];
    seatsByClass[s.seat_type_id].push(s);
  });

  // Para cada clase, asignar
  for (const seatTypeId in passengersByClass) {
    const pax = passengersByClass[seatTypeId];
    const available = seatsByClass[seatTypeId].filter(
      (s) => !occupiedSeatIds.has(s.seat_id)
    );

    // Agrupar por compra
    const groups = {};
    pax.forEach((p) => {
      if (!groups[p.purchase_id]) groups[p.purchase_id] = [];
      groups[p.purchase_id].push(p);
    });

    for (const purchaseId in groups) {
      const group = groups[purchaseId];

      // Separar adultos y menores
      const adults = group.filter((p) => p.age >= 18 && !p.seat_id);
      const minors = group.filter((p) => p.age < 18 && !p.seat_id);

      // 1) Asignar menores junto a un adulto
      for (const minor of minors) {
        if (adults.length > 0) {
          const adult = adults.pop(); // tomar un adulto
          const pair = findAdjacentPair(available);
          if (pair) {
            minor.seat_id = pair[0].seat_id;
            adult.seat_id = pair[1].seat_id;
            // marcar ocupados
            occupiedSeatIds.add(pair[0].seat_id);
            occupiedSeatIds.add(pair[1].seat_id);
            // quitar de available
            removeFromArray(available, pair[0].seat_id);
            removeFromArray(available, pair[1].seat_id);
          }
        }
      }

      // 2) Asignar el resto del grupo
      for (const person of group) {
        if (!person.seat_id) {
          const seat = available.shift();
          if (seat) {
            person.seat_id = seat.seat_id;
            occupiedSeatIds.add(seat.seat_id);
          }
        }
      }
    }
  }

  return passengers;
}

// Buscar un par de asientos contiguos disponibles
function findAdjacentPair(available) {
  for (let i = 0; i < available.length - 1; i++) {
    if (areAdjacent(available[i], available[i + 1])) {
      return [available[i], available[i + 1]];
    }
  }
  return null;
}

// Remover asiento de array por seat_id
function removeFromArray(arr, seatId) {
  const idx = arr.findIndex((s) => s.seat_id === seatId);
  if (idx !== -1) arr.splice(idx, 1);
}

export { assignSeats };
