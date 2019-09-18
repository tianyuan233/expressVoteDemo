

exports.showLogin = function (req, res, next) {
  res.render('user/login.art')
}

exports.Login = function (req, res, next) {
  let body = req.body
  console.log(body);
  
  res.render('user/login.art')
}


exports.showRegister = function (req, res, next) {
  res.render('user/register.art')
}

exports.register = function (req, res, next) {
  res.render('user/register.art')
}
