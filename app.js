const express = require('express');
const path = require('path')
const cookieParser = require('cookie-parser')

const User = require('./routes/user');

const app = express();
app.engine('art', require('express-art-template'))

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'art');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/user',User)

app.listen(3000, function () {
  console.log('app listening on port 3000!');
});