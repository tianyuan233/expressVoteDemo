const express = require('express');
const path = require('path')
const cookieParser = require('cookie-parser')
const User = require('./routes/user')
const Vote = require('./routes/vote')
const app = express();

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

app.listen(3000, function () {
  console.log('app listening on port 3000!');
});