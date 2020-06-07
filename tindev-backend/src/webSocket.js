const socketio = require('socket.io');

const setupWebSocket = (server) => {
  const io = socketio(server);
  const connectedUsers = {};

  io.on('connection', (socket) => {
    const { user } = socket.handshake.query;
    connectedUsers[user] = socket.id;
  });

  return { io, connectedUsers };
};

module.exports = { setupWebSocket };
