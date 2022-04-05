const express = require(`express`);
const http = require(`http`);
const cors = require(`cors`);
const apiRoutes = require(`./routers/apiRoutes`);
const routChecker = require(`./middlewares/routChecker`);
const path = require(`path`);
const { ENV: { PORT } } = require('./utils/config');

const app = express();
const httpServer = http.createServer(app);
const socketUtils = require(`./utils/socketUtils`);

// Middlewares
app.use(cors());
app.use(express.static(path.resolve(__dirname, `./public`)));

const io = socketUtils.sio(httpServer);
socketUtils.connection(io);

// Routes
app.use(`/api`, apiRoutes);

// Middlewares
app.use(`/*`, routChecker);

// Listen
const connectedServer = httpServer.listen(PORT, () => console.log(`Server is up and running on port: ${PORT}`));
connectedServer.on(`error`, error => console.error(error.message));