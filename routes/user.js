const { Router } = require('express');
const router = Router();
const User = require('../controller/user')
//用户页
router.route('/')
  .get(User.showUserInfo)
//登录
router.route('/login')
  .get(User.showLogin)
  .post(User.Login)

//注册
router.route('/register')
  .get(User.showRegister)
  .post(User.register)

//退出
router.route('/logout')
  .get(User.Logout)

module.exports = router;
