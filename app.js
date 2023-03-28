require("dotenv").config();
const morgan = require('morgan');
const userrouter = require("./routes/user");
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const cors = require("cors")
const chatService = require('./services/chatService');
const app = express();

app.use(morgan('combined'));
app.use(express.json())
app.use(cors())
app.use("/api", userrouter)

const server = http.createServer(app);
const io = socketIO(server, { cors: { origin: "*" } });
chatService(io);

let PORT = process.env.PORT || 5050
server.listen(PORT, () => {
    console.log(`Your server is listening on http://localhost:${PORT}`);
});
