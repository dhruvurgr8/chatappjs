const http = require("http");
const express = require("express");
const { join } = require("path");
const { Server } = require("socket.io");

const app = express(); // Initialize Express app
const server = http.createServer(app); // Create HTTP server using Express app
const io = new Server(server, {
  connectionStateRecovery: {}, // this will give messages on being disconnected.
}); // Initialize Socket.io server

// Serve static files from "public" directory
app.use(express.static(join(__dirname, "docs")));

// Socket.io connection handling
io.on("connection", (socket) => {
  console.log(`user connected`);
  // adding the typing functionality
  //   socket.on("typing", () => {
  //     io.emit("typing", socket.id);
  //   });

  // receiving message
  socket.on("message", (data) => {
    console.log("message:-", data);
    io.emit("message", data); // io.emit broadcasts message to everyone
  });
});

// Define route for the homepage
app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "index.html"));
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

// this is the final code
