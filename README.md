# andes-airlines-api
# ✈️ Airline - Asignación de Asientos

## 📌 Descripción
Este proyecto implementa un servicio REST en **Node.js + Express** que devuelve la información de un vuelo y sus pasajeros, incluyendo la asignación automática de asientos según reglas de negocio.

Se conecta a la base de datos **MySQL** `airline` (incluida en `airline.sql`).

---

## 🚀 Tecnologías usadas
- Node.js (Express)
- MySQL
- dotenv
- nodemon (para desarrollo)

---

## ⚙️ Instalación y configuración
npm install
Configurar variables de entorno

Crea un archivo .env en la raíz con tus credenciales locales:
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=TU_PASSWORD
DB_NAME=airline
PORT=3000

Ejecución
Modo desarrollo
npm run dev


Endpoints disponibles
GET /flights/:id/passengers

Devuelve la información de un vuelo y los pasajeros con asientos asignados.
### 1. Clonar repositorio
```bash
git clone <URL_DEL_REPO>
cd airline-api
