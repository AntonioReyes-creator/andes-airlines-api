import { keysToCamel } from '../utils/camelCase.js'; // reemplaza con el nombre real

const datos = {
  nombre_usuario: "Carlos",
  direccion_info: {
    calle_principal: "Av. Siempre Viva",
    codigo_postal: "12345"
  },
  historial: [
    { fecha_ingreso: "2025-01-01", activo: true },
    { fecha_ingreso: "2025-02-01", activo: false }
  ]
};

const datosConvertidos = keysToCamel(datos);

console.log(JSON.stringify(datosConvertidos, null, 2));