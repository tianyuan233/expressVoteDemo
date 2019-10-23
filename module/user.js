const Sequelize = require('sequelize');
const Model = Sequelize.Model;
const sequelize = require('../util/db')


class User extends Model { }
User.init({
  username: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  }

}, {
  sequelize,
  modelName: 'user',
  timestamps: true
});


module.exports = User