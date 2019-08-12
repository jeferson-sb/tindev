require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes');

const port = 3001;
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const connectedUsers = {};

io.on('connection', socket => {
  const { user } = socket.handshake.query;
  console.log('New connection', socket.id);

  connectedUsers[user] = socket.id;
});

const options = {
  useNewUrlParser: true
};
mongoose.connect(`mongodb://localhost:27017/${process.env.MONGO_DB}`, options);

app.use((req, res, next) => {
  req.io = io;
  req.connectedUsers = connectedUsers;
  return next();
});

app.use(cors());
app.use(express.json());
app.use(routes);

server.listen(port, () => console.log(`Server running on port ${port}`));
