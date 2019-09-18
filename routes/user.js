const { Router } = require('express');
const router = Router();
const User = require('../controller/user')
//用户页

//登录
router.route('/login')
  .get(User.showLogin)
  .post(User.Login)

//注册
router.route('/register')
  .get(User.register)
  .post(User.showRegister)



module.exports = router;
