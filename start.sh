
---

# 📄 `start.sh`

# Crea este archivo en la raíz del proyecto (`start.sh`) y dale permisos de ejecución con:

# ```bash
# chmod +x start.sh

#!/bin/bash
echo "🚀 Iniciando Airline API..."

# Cargar variables de entorno
if [ -f .env ]; then
  export $(cat .env | xargs)
fi

# Instalar dependencias si faltan
if [ ! -d "node_modules" ]; then
  echo "📦 Instalando dependencias..."
  npm install
fi

# Levantar servidor
echo "🌐 Servidor corriendo en http://localhost:${PORT:-3000}"
npm start
