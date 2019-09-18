const users = [{
  username: 'a',
  email: 'a@qq.com',
  password: 'a'
}, {
  username: 'b',
  email: 'b@qq.com',
  password: 'b'
}]

exports.showUserInfo = function (req, res, next) {
  let login = false
  username = req.signedCookies.username
  console.log(username);
  
  // console.log('username-------',username);
  if (username) {
    login = true
  }
  res.render('user/index.art',
  {
    'login':login,
    'username':username
  })
}

exports.showLogin = function (req, res, next) {
  res.render('user/login.art')
}

exports.Login = function (req, res, next) {
  var tryLoginUser = req.body
  if (users.findIndex(it => {
    return it.name == tryLoginUser.name && it.password == tryLoginUser.password
  }) >= 0) {
    res.cookie('username', tryLoginUser.username, {
      signed: true
    })
    res.redirect('/user')
  } else {
    res.end('用户名或密码错误')
  }

  res.render('user/login.art')
}


exports.showRegister = function (req, res, next) {

  res.render('user/register.art')
}

exports.register = function (req, res, next) {
  res.render('user/register.art')
}
