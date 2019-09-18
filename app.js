const express = require('express');
const path = require('path')
const cookieParser = require('cookie-parser')

const User = require('./routes/user');

const app = express();
app.engine('art', require('express-art-template'))
app.set('view engine', 'art');
app.set('views', path.join(__dirname, 'views'));

app.use(cookieParser('my secret'))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.set('Content-Type', 'text/html; charset=UTF-8')
  next()
})

app.use('/user',User)

app.listen(3000, function () {
  console.log('app listening on port 3000!');
});