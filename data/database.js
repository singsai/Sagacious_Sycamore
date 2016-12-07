var Sequelize = require('sequelize');

// NOTE: create hrgotchi database before running
var db = new Sequelize('hrgotchi', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

//user schema
var User = db.define('User', {
  username: {type: Sequelize.STRING, unique: true},
  password: Sequelize.STRING
});

//pet schema
var Pet = db.define('Pet', {
  name: {type: Sequelize.STRING, unique: true},
  love: {type: Sequelize.INTEGER, defaultValue: 0},
  feed:{type: Sequelize.INTEGER, defaultValue: 0},
  feedTime: {type: Sequelize.DATE, defaultValue: Sequelize.NOW},
  sleep: {type: Sequelize.INTEGER, defaultValue: 0},
  sleepTime: {type: Sequelize.DATE, defaultValue: Sequelize.NOW},
  health: {type: Sequelize.INTEGER, defaultValue: 50},
  level: {type: Sequelize.INTEGER, defaultValue: 1},
});

//creates any missing tables
User.sync();
Pet.sync();

module.exports = {
  User: User,
  Pet: Pet,
  db: db
} 

