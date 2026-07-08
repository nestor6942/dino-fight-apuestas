# AGENTS — Instrucciones para agentes de IA

Breve guía para que un agente de codificación entienda y trabaje productivamente en este repositorio.

Propósito
- Repositorio: juego web multiplayer simple con servidor WebSocket en `server.js`.
- Objetivo del agente: ayudar a desarrollar, depurar y mantener el juego, sin cambiar convenciones sin preguntar.

Comandos útiles
- Instalar dependencias: `npm install`
- Arrancar la app: `npm start` (ejecuta `node server.js`).
- Variable de entorno: `PORT` (por defecto 3000).

Puntos clave del proyecto
- Servidor: [server.js](server.js) — Express + WebSocket, escucha en `0.0.0.0:${PORT||3000}` y expone `/ws`.
- Frontend: [overlay.html](overlay.html) (cliente de apuestas).
- Recursos estáticos: carpeta [img/](img)
- Archivo clave: `overlay.html` (apuestas con perlas).

Convenciones y recomendaciones para el agente
- No alterar nombres públicos de rutas ni la API WebSocket (`/ws`) sin aprobación.
- Mantener los assets estáticos en la raíz; usar rutas relativas coherentes con `express.static(__dirname)`.
-- Antes de cambiar nombres de archivos (ej. `overlay.html`), sugerir renombrado y avisar al usuario.
- No añadir dependencias sin justificar; preferir cambios simples y reversibles.

Qué revisar primero al abrir este repo
1. Ejecutar `npm install` y `npm start` localmente para validar que el servidor arranca.
2. Abrir [index.html](index.html) en navegador y comprobar conexión WebSocket en `ws://<host>:<port>/ws`.
3. Revisar `server.js` para entender la estructura de `rooms` y la lógica de sincronización (tick a 30 FPS).

Documentación adicional
- No hay README extenso en el repo; enlazar a este archivo desde cualquier README nuevo.

Contacto/Feedback
- Si necesitas más reglas (por ejemplo tests o hooks), pide crear archivos `.agent.md` o skills específicas.
