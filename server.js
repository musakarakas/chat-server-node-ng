var express = require('express'), app = express();

app.configure(function () { app.use(express.static(__dirname + '/public')); });

app.get('/', function (req, res) { res.render('home.jade'); });

var server = require('http').createServer(app);
server.listen(3000);
var io = require('socket.io').listen(server);

io.sockets.on('connection', function (socket) {
  var user;
  socket.on('setUser', function (name) { user = name; });
  socket.on('message', function (text) {
    socket.broadcast.emit('message', {user: user, text: text});
  });
});
