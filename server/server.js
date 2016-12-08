var express = require('express');
var bodyParser = require('body-parser');
var db = require('../data/database.js').db;
var controller = require('./controller.js');

//start sequelize database
db.authenticate()
  .then(function(err) {
    if (err) {
      throw error;
    } else {
      console.log('Database started.');
    }
  })
  .catch(function(err) {
    console.log('error connecting', err);
  });

//use bodyparser middleware
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json()); 

var app = express();

//default index route
app.get('/', function(req, res) {
  res.sendFile('./public/index.html');
});

//use controller.js as middleware
app.get('api/pet', controller); //todo add method
app.post('api/pet', controller); //todo add method

app.listen(3000);
console.log('Server listening on 3000...');