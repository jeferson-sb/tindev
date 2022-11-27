import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import { Server } from 'http'

import { setupWebSocket } from './webSocket.js'
import connectSocket from './middleware/connectSocket.js'
import connectDB from './config/db.js'
import routes from './routes.js'

const app = express();
const server = Server(app);

connectDB();
const webSocket = setupWebSocket(server);

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(connectSocket(webSocket));
app.use('/api', routes);

export default server;
