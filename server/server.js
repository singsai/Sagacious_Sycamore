var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
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

//start express
var app = express();

//use bodyparser middleware
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json()); 

//use cookieparser & session
app.use(cookieParser('cookies!!!'));
app.use(session({
  secret: 'What\'s your secret?',
  resave: false,
  saveUninitialized: true
}));


//default index route
app.get('/', function(req, res) {
  res.sendFile('../public/index.html');
});

//use controller.js as middleware
app.get('/api/pet', controller.get); //todo add method
app.post('/api/pet', controller.post); //todo add method

//route to controller.js
app.get('/login', function(req, res) {
  res.redirect('/api/pet');
})
app.post('/login', controller.login);
app.get('/logout', controller.logout);
app.post('/signup', controller.signup);

app.listen(3000);
console.log('Server listening on 3000...');