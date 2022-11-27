import { Server } from "socket.io"

const setupWebSocket = (server) => {
  const io = new Server(server);
  const connectedUsers = {};

  io.on('connection', (socket) => {
    const { user } = socket.handshake.query;
    connectedUsers[user] = socket.id;
  });

  return { io, connectedUsers };
};

export { setupWebSocket };
