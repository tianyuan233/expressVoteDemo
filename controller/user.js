const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const conn = require('../util/db')
const User = require('../module/user')
exports.showUserInfo = function (req, res, next) {
  if (req.signedCookies.username) {
    res.render('user/index.pug', {
      username: req.signedCookies.username
    })
  } else {
    res.redirect(301, '/login')
  }
}

exports.showLogin = function (req, res, next) {
  res.render('user/login.pug')
}

exports.Login = function (req, res, next) {
  let loginUser = req.body
  User.findOne({
    where: {
      [Op.and]: {
        username: loginUser.username,
        password: loginUser.password
      }
    },
  }).then(result => {
    if (result) {
      res.cookie('userid', result.id, {
        signed: true
      })
      res.cookie('username', result.username, {
        signed: true
      })
      res.redirect(301, '/')
    } else {
      res.render('user/login.pug', { info: "用户名或密码错误" })
    }
  })


}

exports.showRegister = function (req, res, next) {
  res.render('user/register.pug')
}

exports.register = async function (req, res, next) {
  let regUser = req.body
  let searchExists = await User.findOne({
    where: {
      [Op.or]: {
        username: regUser.username,
        email: regUser.email
      }
    }
  })
  if (searchExists) {
    res.render('user/register.pug', { info: "用户名或邮箱已存在" })
  } else {
    User.create({
      username: regUser.username,
      email: regUser.email,
      password: regUser.password
    }).then(() => {
      res.render('user/register.pug', { info: "注册成功" })
    })
  }
}

exports.Logout = function (req, res, next) {
  res.clearCookie('userid')
  res.clearCookie('username')
  res.redirect(301, '/login')
}
