const express = require('express');
const http = require('http');
const path = require('path');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server, path: '/ws' });
const PORT = process.env.PORT || 3000;

const rooms = new Map();

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'overlay.html')));
app.use(express.static(__dirname));

function createRoomId() {
  return 'ROOM-' + Math.random().toString(36).slice(2, 7).toUpperCase();
}

function getRoom(roomId) {
  if (!rooms.has(roomId)) {
    rooms.set(roomId, { id: roomId, clients: new Map(), players: [] });
  }
  return rooms.get(roomId);
}

function broadcast(room, payload) {
  const data = JSON.stringify(payload);
  room.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) client.send(data);
  });
}

function updateRoom(room) {
  if (room.players.length < 2) return;

  const [p1, p2] = room.players;

  if (p1.keys.left) p1.x -= 4;
  if (p1.keys.right) p1.x += 4;
  if (p1.keys.up && p1.y >= 330) p1.vy = -12;
  if (p1.keys.attack) {
    p1.attacking = true;
    if (p1.attackTimer <= 0) p1.attackTimer = 8;
  } else {
    p1.attacking = false;
  }

  if (p2.keys.left) p2.x -= 4;
  if (p2.keys.right) p2.x += 4;
  if (p2.keys.up && p2.y >= 330) p2.vy = -12;
  if (p2.keys.attack) {
    p2.attacking = true;
    if (p2.attackTimer <= 0) p2.attackTimer = 8;
  } else {
    p2.attacking = false;
  }

  p1.vy += 0.7;
  p1.y += p1.vy;
  if (p1.y > 330) { p1.y = 330; p1.vy = 0; }
  p1.x = Math.max(0, Math.min(900 - p1.w, p1.x));

  p2.vy += 0.7;
  p2.y += p2.vy;
  if (p2.y > 330) { p2.y = 330; p2.vy = 0; }
  p2.x = Math.max(0, Math.min(900 - p2.w, p2.x));

  if (p1.attackTimer > 0) p1.attackTimer -= 1;
  if (p2.attackTimer > 0) p2.attackTimer -= 1;

  const distance = Math.abs((p1.x + p1.w / 2) - (p2.x + p2.w / 2));
  if (p1.attacking && distance < 90 && p2.stunned <= 0) {
    p2.hp = Math.max(0, p2.hp - 0.8);
    p2.stunned = 8;
  }
  if (p2.attacking && distance < 90 && p1.stunned <= 0) {
    p1.hp = Math.max(0, p1.hp - 0.8);
    p1.stunned = 8;
  }

  if (p1.stunned > 0) p1.stunned -= 1;
  if (p2.stunned > 0) p2.stunned -= 1;

  broadcast(room, { type: 'state', roomId: room.id, players: room.players.map((player) => ({ ...player, keys: undefined })) });
}

wss.on('connection', (ws, req) => {
  const params = new URL(req.url, 'http://localhost');
  const roomId = params.searchParams.get('room') || createRoomId();
  const room = getRoom(roomId);

  if (room.players.length >= 2) {
    ws.send(JSON.stringify({ type: 'full', roomId }));
    ws.close();
    return;
  }

  const playerIndex = room.players.length;
  const player = {
    id: playerIndex,
    name: params.searchParams.get('name') || `Jugador ${playerIndex + 1}`,
    x: playerIndex === 0 ? 100 : 740,
    y: 330,
    w: 90,
    h: 90,
    vy: 0,
    hp: 100,
    facing: playerIndex === 0 ? 1 : -1,
    attacking: false,
    stunned: 0,
    attackTimer: 0,
    keys: { left: false, right: false, up: false, attack: false }
  };

  room.clients.set(ws, { playerIndex });
  room.players.push(player);

  ws.on('message', (message) => {
    try {
      const data = JSON.parse(message.toString());
      if (data.type === 'input') {
        const clientData = room.clients.get(ws);
        if (!clientData) return;
        const playerRef = room.players[clientData.playerIndex];
        if (playerRef) playerRef.keys = { ...playerRef.keys, ...data.keys };
      }
    } catch (error) {
      console.error('Error parsing message', error);
    }
  });

  ws.on('close', () => {
    const clientData = room.clients.get(ws);
    if (!clientData) return;
    room.clients.delete(ws);
    room.players.splice(clientData.playerIndex, 1);
    if (room.players.length === 0) {
      rooms.delete(roomId);
    }
  });

  ws.send(JSON.stringify({ type: 'joined', roomId, playerIndex, player }));
});

setInterval(() => {
  rooms.forEach((room) => updateRoom(room));
}, 1000 / 30);

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Dino Fight corriendo en http://localhost:${PORT}`);
  console.log(`También accesible desde la red en http://0.0.0.0:${PORT}`);
});
