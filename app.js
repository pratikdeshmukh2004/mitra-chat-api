require("dotenv").config();
const morgan = require('morgan');
const userrouter = require("./routes/user");
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const chatService = require('./services/chatService');
const app = express();
const server = http.createServer(app);
const io = socketIO(server, {cors: {origin: "*"}});

// Set up Socket.io chat service
chatService(io);

// ... Rest of your server setup and route handlers

app.use(morgan('combined'));
app.use(express.json())
app.use(userrouter)

let PORT = process.env.PORT || 5050
io.listen(PORT, () => {
    console.log(`Your server is listening on http://localhost:${PORT}`);
});
