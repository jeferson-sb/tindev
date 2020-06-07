const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const { setupWebSocket } = require('./webSocket');
const connectSocket = require('./middleware/connectSocket');
const connectDB = require('./config/db');
const routes = require('./routes');

const app = express();
const server = require('http').Server(app);

connectDB();
const webSocket = setupWebSocket(server);

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(connectSocket(webSocket));
app.use('/api', routes);

module.exports = server;
