const path = require('path')
const cookieParser = require('cookie-parser')
const User = require('./routes/user')
const Vote = require('./routes/vote')
const url = require('url')
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
// const socket = require('./util/socket')
global.io = io

io.on('connection', function (socket) {
  const path = url.parse(socket.request.headers.referer).path
  console.log(path);
  socket.join(path)
  // socket.join(socket.request.headers.referer)

  console.log('a user connected');
});

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'))

app.use(cookieParser('myasdasdasdsecret'))

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use('/static', express.static('public'))
// app.use((req, res, next) => {
//   res.set('Content-Type', 'text/html; charset=UTF-8')
//   next()
// })
app.use('/', User)
app.use('/vote', Vote)

server.listen(3000, function () {
  console.log('app listening on port 3000!');
});