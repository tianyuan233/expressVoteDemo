const mailer = require('nodemailer')

const mailSender = mailer.createTransport({
  service:'qq',
  auth:{
    user:'',
    pass:''
  }
})


module.exports = mailSender