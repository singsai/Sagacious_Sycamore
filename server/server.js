var express = require('express');
var bodyParser = require('body-parser');
var db = require('../data/database.js').db;

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

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json()); 

var app = express();

app.get('/', function(req, res) {
  res.sendFile('./public/index.html');
});

app.listen(3000);
console.log('Server listening on 3000...');