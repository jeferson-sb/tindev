import { Server } from 'socket.io';
import config from './config/index.js';

const setupWebSocket = server => {
  const io = new Server(server, {
    cors: {
      origin: config.client,
      methods: ['GET', 'POST']
    }
  });
  const connectedUsers = {};

  io.on('connection', socket => {
    const { user } = socket.handshake.query;
    connectedUsers[user] = socket.id;
  });

  return { io, connectedUsers };
};

export { setupWebSocket };
