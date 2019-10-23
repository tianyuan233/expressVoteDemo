const Sequelize = require('sequelize');
const Model = Sequelize.Model;
const sequelize = require('../util/db')


class Choice extends Model { }
Choice.init({
  userid: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  voteid: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  optionid: {
    type: Sequelize.INTEGER,
    allowNull: false
  }

}, {
  sequelize,
  modelName: 'choice',
  timestamps: true
});

module.exports = Choice