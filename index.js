const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on("connection", async (socket) => {
  console.log('---------user connected!')

  socket.on('define username', request => {
    socket.join(request.myUsername);
    console.log(request.myUsername+' defined!')
  });

  socket.on('send message', request => {
    console.log('message from '+request.myUsername+' to '+request.username+' : '+request.message)

    socket.join(request.username);

    io.to(request.username).emit('receive message', {"myUsername":request.myUsername, "message":request.message});
  });

});

http.listen(3000, () => {
  console.log(`Socket.IO server running at http://localhost:3000/`);
});

