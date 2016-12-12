var Sequelize = require('sequelize');

// NOTE: create 'hrgotchi' database before running
var db = new Sequelize('hrgotchi', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false
});

//user schema
var User = db.define('Users', {
  username: {type: Sequelize.STRING, unique: true},
  password: Sequelize.STRING,
}, {timestamps: false});

//pet schema
var Pet = db.define('Pets', {
  name: {type: Sequelize.STRING, allowNull: false, unique: true},
  status: {type: Sequelize.STRING, defaultValue: 'normal'},
  feed: {type: Sequelize.INTEGER, defaultValue: 5},
  health: {type: Sequelize.INTEGER, defaultValue: 5},
  love: {type: Sequelize.INTEGER, defaultValue: 5},
  experience: {type: Sequelize.INTEGER, defaultValue: 0},
  level: {type: Sequelize.INTEGER, defaultValue: 1},
  mood: {type: Sequelize.STRING, defaultValue: 'normal'},
  phys: {type: Sequelize.STRING, defaultValue: 'normal'},
  img: {type: Sequelize.STRING, defaultValue: 'http://i.imgur.com/RzBy3Vw.gif'},
}, {timestamps: false});

//creates any missing tables
//pass in {force: true} to clear tables
User.sync();
Pet.sync();

module.exports = {
  User: User,
  Pet: Pet,
  db: db
} 