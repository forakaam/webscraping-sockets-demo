const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const bodyParser = require("body-parser");

app.use(express.static(__dirname + '/../public'));
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine', 'pug');

io.on('connection', function(socket) {

  socket.on('message', function(data) {
    io.emit('message', data);
  });

});

app.get('/', function(req, res) {
  res.render('index');
});

app.get('*', function(req, res) {
  res.redirect('/');
});

server.listen(3000, function() {
  console.log("Listening on port 3000...")
});