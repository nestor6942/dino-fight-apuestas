# Copilot instructions for this repo

Purpose
- Ayudar a los desarrolladores a editar, depurar y expandir el juego `Dino Fight` sin romper la API pública.

Quick rules
- Evitar cambiar la ruta WebSocket `/ws` o el formato de mensajes sin confirmar con el mantenedor.
- Mantener los assets en `img/` y rutas relativas coherentes con `express.static(__dirname)`.
No renombrar archivos candidatas a typo (por ejemplo `overlay.html`) sin preguntar al mantenedor.

Commands
- `npm install` — instala dependencias.
- `npm start` — inicia el servidor en `PORT` (por defecto 3000).
- `npm run dev` — inicia en modo desarrollo con `nodemon` (requiere instalar dependencias).

Files of interest
- `server.js` — servidor, salas y lógica de sincronización.
- `index.html`, `app.js` — cliente.

Testing & changes
- Añade tests pequeños o scripts de smoke cuando añadas funcionalidades importantes.
- Cuando propongas dependencias nuevas, explica por qué y el coste (tamaño, seguridad).

If in doubt
- Crea un PR pequeño y añade instrucciones para probarlo manualmente.
