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
  saveUninitialized: true,
  cookie: {maxAge: 60000000, testkey: "testvalue"}
}));

//log requests
app.post('/log', controller.getLog);

//api requests
app.post('/api/petstatus', controller.get);
app.post('/api/pet', controller.post);
app.post('/api/newPet', controller.new);
app.get('/api/question', controller.getQuestion);
app.post('/api/question', controller.addQuestion);
app.post('/api/answer', controller.checkAnswer);
app.get('/api/test', function(req, res) {
  console.log('Testing polling function...');
  poll();
  res.end();
});

// -------------------------- TEST ROUTES -------------------------- //

app.get('/test/pets', controller.getPets);


//login and logout routes
app.get('/logout', controller.logout);
app.post('/login', controller.login);
app.post('/signup', controller.signup);


app.get('/game', function(req, res) {
  res.sendFile(__dirname + '/public/indexGame.html');
})

//index route
app.get('/*', function(req, res) {
  res.sendFile(__dirname + '/public/index.html');
});








// Uncomment to poll database reguarly
setInterval(poll, 2000);

app.listen(3000);
console.log('Server listening on 3000...');
