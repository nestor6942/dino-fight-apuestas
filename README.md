# Dino Fight

Juego web de apuestas con Node.js, Express y WebSocket.

## Requisitos

- Node.js 18+ instalado.

## Instalación

```bash
npm install
```

## Ejecución local

```bash
npm start
```

Luego abre `http://localhost:3000`.

## Despliegue con enlace fijo en Render

El proyecto ya incluye [render.yaml](render.yaml), así que Render detecta la configuración automáticamente.

1. Sube este proyecto a GitHub.
2. Entra a Render y elige `New +` > `Blueprint`.
3. Conecta tu repositorio.
4. Render leerá `render.yaml` y creará el servicio.
5. Cuando termine, te dará una URL fija, por ejemplo `https://dino-fight-apuestas.onrender.com`.

Cada vez que vuelvas a hacer `git push`, Render publicará los cambios automáticamente.

## Notas

- La página principal es [overlay.html](overlay.html).
- El servidor escucha en `process.env.PORT`, así que funciona en hosting sin cambios extra.
- El endpoint WebSocket público sigue siendo `/ws`.
- En Render free la app puede tardar unos segundos en despertar si pasa tiempo sin uso.
