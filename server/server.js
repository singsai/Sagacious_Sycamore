var express = require('express');
var bodyParser = require('body-parser');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json()); 

var app = express();

app.get('/', function(req, res) {
  res.sendFile('./public/index.html');
});

/*
app.get('APIROUTE', function(req, res) {
  DATABASE QUERY
});

app.post('APIROUTE', function(req, res) {
  DATABASE INSERT
})
*/

app.listen(3000);
console.log('Server listening on 3000...');