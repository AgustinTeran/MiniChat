var express = require('express');
var app = express();
var cors = require('cors');

app.use(express.json());
app.use(cors({
  origin: "*",
  credentials: true,
  allowedHeaders: "*",
  methods: "*"
}))



app.get('/', (req, res) => {
    res.send('Hello World!');
});



// sockets
var server = require("http").createServer(server)

var {Server} = require("socket.io")
var io = new Server(server,{
    cors: {
        origin: "*"
    },
    methods: ["GET", "POST"],
    credentials: true
})

io.use((socket,next) => {
  var id = socket.handshake.query.id
  var socketsConectados = io.sockets.sockets

  socket.on('disconnect', () => {
    console.log('Client disconnected')
  });
    
  console.log("Sockets conectados",Array.from(socketsConectados).map(e => e[1].id))


  

  socket.on('message', (message) => {
    console.log('Received message:', message);
    socket.broadcast.emit('message', message); // Broadcast the message to all clients
  });

    next()
})


module.exports = server;