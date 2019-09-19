const conn = require('../util/db')

exports.showUserInfo = function (req, res, next) {
  username = req.signedCookies.username
  console.log(username);

  res.render('user/index.art',
    { 'username': username })
}

exports.showLogin = function (req, res, next) {
  res.render('user/login.art')
}

exports.Login = function (req, res, next) {
  let loginUser = req.body
  console.log(loginUser);

  conn.query('SELECT * from `user` where `username` = ?', [loginUser.username], function (error, results, fields) {
    if (error) throw error;
    if (results.length === 0) {
      res.render('user/login.art', { err: '无此用户' })
    }
    if (loginUser.username === results[0].username && loginUser.password === results[0].password) {
      res.cookie('username', loginUser.username, {
        signed: true
      })
      res.redirect('/')
    } else {
      res.render('user/login.art', { err: '用户名或密码错误' })
    }
  });
  conn.end()
}

exports.showRegister = function (req, res, next) {
  res.render('user/register.art')
}

exports.register = function (req, res, next) {
  let regUser = req.body
  conn.query('SELECT * from `user` where `username` = ?', [regUser.username], function (error, rows, fields) {
    if (error) throw error;
    if (rows.length > 0) {
      res.render('user/register.art', { err: '用户名已被注册' })
    } else {
      conn.query('insert into `user`(username,email,password) values (?,?,?)', [regUser.username, regUser.email, regUser.password], function (error, results, fields) {
        if (error) throw error;
        res.render('user/register.art', { info: '注册成功' })
      });
      conn.end()
    }
  })
  conn.end()
}
