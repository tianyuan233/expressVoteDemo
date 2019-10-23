const Sequelize = require('sequelize');

const sequelize = new Sequelize(
  'mysql://root:123456@localhost:3306/vote',
  {
    // logging: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
  );
// 同步数据模型与数据表
// sequelize.sync()

module.exports = sequelize