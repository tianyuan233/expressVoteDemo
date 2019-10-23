const Sequelize = require('sequelize');
const Model = Sequelize.Model;
const sequelize = require('../util/db')


class Vote extends Model { }
Vote.init({
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  desc: {
    type: Sequelize.STRING,
    allowNull: true
  },
  userid: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  singleSelection: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  },
  anonymouse: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  },
  deadline: {
    type: Sequelize.DATE,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'vote',
  timestamps: true
});

module.exports = Vote