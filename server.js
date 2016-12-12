var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var cors = require('cors');
var db = require('./data/database.js').db;
var controller = require('./server/controller.js');
var poll = require('./server/worker.js').poll;

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
app.use(bodyParser.urlencoded({'extended':false}));
app.use(bodyParser.json()); 
app.use(cors());

//use cookieparser & session
app.use(cookieParser('cookies!!!'));
app.use(session({
  secret: 'What\'s your secret?',
  resave: false,
  saveUninitialized: true
}));

//server routes, controller.js handles requests
app.get('/login', function(req, res){
  res.sendFile(__dirname + '/public/index.html')
})
app.get('/home', controller.checkUser, function(req, res){
  res.sendFile(__dirname + '/public/index.html')
})

app.get('/logout', controller.logout);
app.post('/login', controller.login);
app.post('/signup', controller.signup);

//Log requests
app.get('/log', controller.getLog);
app.post('/log', controller.postLog);

//api requests
app.get('/api/pet', controller.get);
app.post('/api/pet', controller.post);
app.post('/api/newPet', controller.new);
app.get('/api/test', function(req, res) {
  console.log('testing polling function...');
  poll();
  res.end();
});

// Uncomment to poll database reguarly
setInterval(poll, 2000);

app.listen(3000);
console.log('Server listening on 3000...');
