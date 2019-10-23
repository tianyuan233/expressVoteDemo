const Sequelize = require('sequelize');
const Model = Sequelize.Model;
const sequelize = require('../util/db')


class Option extends Model { }
Option.init({
  content: {
    type: Sequelize.STRING,
    allowNull: false
  },
  voteid: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'option',
  timestamps: true
})

module.exports = Option