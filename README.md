# andes-airlines-api
# ✈️ Airline - Asignación de Asientos

## Descripción
Este proyecto implementa un servicio REST en **Node.js + Express** que devuelve la información de un vuelo y sus pasajeros, incluyendo la asignación automática de asientos según reglas de negocio.

Se conecta a la base de datos **MySQL** `airline` (incluida en `airline.sql`).

---

##  Tecnologías usadas
- Node.js (Express)
- MySQL
- dotenv
- nodemon (para desarrollo)

---
## Descripcion y concepto de herramientas usadas:
### para lograr este reto primeramente realizar.
> > npm init -y
Dependencias normales
> > npm install dotenv express morgan mysql2
Dependencias de desarrollo
> > npm install --save-dev eslint nodemon prettier

| Dependencia | Propósito principal                            |
| ----------- | ---------------------------------------------- |
| `dotenv`    | Manejo de variables de entorno                 |
| `express`   | Framework para APIs web                        |
| `morgan`    | Logs HTTP para debugging                       |
| `mysql2`    | Conexión con base de datos MySQL               |
| `eslint`    | Linter para mejorar calidad de código          |
| `nodemon`   | Reinicio automático del servidor en desarrollo |
| `prettier`  | Formateo automático del código                 |

Scripts

+dev: Inicia la app con nodemon para recargar en cada cambio.
+start: Ejecuta la app normalmente con Node.js.
+lint: Revisa el código buscando errores o problemas de estilo con ESLint.
+format: Formatea automáticamente el código usando Prettier.
+test: Corre pruebas usando el sistema de testing nativo de Node (node--test).

### Instalación y configuración
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
git clone < URL_DEL_REPO >
