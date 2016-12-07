var express = require('express');
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


var app = express();

app.listen(3000);

console.log('Server listening on 3000...');