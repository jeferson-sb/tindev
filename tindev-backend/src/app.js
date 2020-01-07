const config = require('./config');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const routes = require('./routes');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

mongoose.connect(`${config.databaseUrl}`, options);

const connectedUsers = {};

io.on('connection', socket => {
  const { user } = socket.handshake.query;
  connectedUsers[user] = socket.id;
});

app.use((req, res, next) => {
  req.io = io;
  req.connectedUsers = connectedUsers;
  return next();
});

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(routes);
app.use(express.static(path.resolve(__dirname, '..', 'public')));

server.listen(config.port, () =>
  console.log(`Server is up and running on port ${config.port}`)
);
