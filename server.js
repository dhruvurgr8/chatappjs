const http = require("http");
const express = require("express");
const { join } = require("path");
const { Server } = require("socket.io");

const app = express(); // Initialize Express app
const server = http.createServer(app); // Create HTTP server using Express app
const io = new Server(server, {
  connectionStateRecovery: {}, // this will give messages on being disconnected.
}); // Initialize Socket.io server

// Socket.io connection handling
io.on("connection", (socket) => {
  console.log(`user connected`);
  // recieving message
  socket.on("message", (message) => {
    console.log("message:-", message);
    // socket.broadcast.emit('hi');
    io.emit("message", message); // io.emit broadcast message to everyone
  });
});

// Define route for the homepage
app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "index.html"));
});

// Middleware to serve static files
app.use(express.static(join(__dirname, "public"))); // Serve static files from "public" directory

server.listen(3000, () => {
  console.log("server running at http://localhost:3000");
});

// this is the final code
