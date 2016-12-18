  var db = require('../data/database.js');
var Pet = db.Pet;
var User = db.User;
var Log = db.Log;
var Question = db.Question;
var bcrypt = require('bcryptjs');
var moment = require('moment');

/********** Image Assets **********/
var lvl1 = {
  coding: "http://i.imgur.com/KTNujjY.gif",
  sleeping: 'https://media.giphy.com/media/7ZWft74Fqo7aU/giphy.gif', // "http://i.imgur.com/PujjsmB.gif",
  playing: "http://i.imgur.com/T99KqDs.gif",
  eating: "http://i.imgur.com/W8UQN1M.gif"
};

var lvl2 = {
  coding: 'http://i.giphy.com/3oriO1ACIKLSY565q0.gif',
  sleeping: 'http://i.giphy.com/l2JhIsdeKTn5IPQCQ.gif',
  playing: 'http://i.giphy.com/3oriNVPP3ax7b6Ryg0.gif',
  eating: 'http://i.giphy.com/l0MYBdxsQBG15bLTq.gif'
};

var lvl3 = {
  coding: 'http://i.giphy.com/3o7TKVhFwW3ZWiti8g.gif',
  sleeping: 'http://i.giphy.com/3o7TKVhFwW3ZWiti8g.gif',
  playing: 'http://i.giphy.com/3o7TKVhFwW3ZWiti8g.gif',
  eating: 'http://i.giphy.com/3o7TKVhFwW3ZWiti8g.gif'
};

var urls = {
  lvl1: lvl1,
  lvl2: lvl2,
  lvl3: lvl3
};

module.exports = {
  /********** Pet Functions **********/
  get: function(req, res, next) {
    Pet.findOne({where: {user: req.session.user}})
      .then(function(query) {
        if (query) {
          console.log('GET:', req.session.user);
          var pet = query.dataValues;
          res.statusCode = 200;
          console.log('found Pet, current User', req.session.user);
          res.json(pet);
        } else {
          Pet.create({ user: req.session.user, name: 'newPetOf' + req.session.user})
          .then(function(pet) {
            console.log('Created new pet.', 'Name: ', pet.dataValues.name, 'User: ', pet.dataValues.user);
            console.log('current User', req.session.user);
            res.send(pet.dataValues);
          });            
        }
      })
  },
  post: function(req, res, next) {
    Pet.findOne({where: {user: req.session.user}})
      .then(function(pet) {
        if (pet) {
          var newStatus = req.body.status;
          pet.status = newStatus;
          console.log('url', urls['lvl'+ pet.level][newStatus]);
          pet.img = urls['lvl'+ pet.level][newStatus];
          pet.save().then(function(data) {
            console.log('updated status');
            res.statusCode = 201;
            res.end(JSON.stringify(data.dataValues));
          });
        } else {
          console.log('no pets found!');
        }
      });
  },
  new: function(req, res, next) {
    var name = req.body.name;
    var user = req.session.user;
    console.log('new', user);
    Pet.destroy({ where: {user: user}});
    Log.destroy({ where: {user: user} });
    Pet.create({ user: user, name: name})
      .then(function(pet) {
        console.log('Created new pet.', 'Name: ', pet.dataValues.name, 'User: ', pet.dataValues.user);
        res.send("success");
      });
  },
  /********** Quiz Functions **********/
  getQuestion: function(req, res, next) {
    Question.findAll({})
      .then(function(questions) {
        // Pull a random question
        var randomChoice = ~~(Math.random() * questions.length);
        var question = questions[randomChoice];
        console.log('question', question.question);
        question.answer = 0; // Hide the answer until user submites answer
        res.statusCode = 200;
        res.send(question);
      });
  },

  addQuestion: function(req, res, next) {
    Question.create({
      question: req.body.question,
      choice1: req.body.choice1,
      choice2: req.body.choice2,
      choice3: req.body.choice3,
      choice4: req.body.choice4,
      answer: req.body.answer
    })
    .then(function(added) {
        res.send('success');
    });
  },

  checkAnswer: function(req, res, next) {
    var user = req.body.user;
    var id = req.body.id;
    var answer = req.body.answer;
    Question.findOne({where: {id: id}})
      .then(function(question) {
        // console.log('obj', question);
        // console.log('db',question.question, question.answer);
        var obj = {};
        if (question.answer == answer) {
          obj.correct = true;
        } else {
          obj.correct = false;
        }
        // console.log('sending obj', obj);
        res.send(obj);
      });

  },
  /********** Log Functions **********/
  getLog: function(req, res, next) {
    var petName = req.body.name;
    Log.findAll({where: {user: req.session.user}})
      .then(function(queries) {
        queries.length > 15 ? queries=queries.slice(queries.length - 15): null;
        var logs = queries.map(function(query) {
          query.dataValues.createdAt = moment(query.dataValues.createdAt).fromNow();
          return query.dataValues
        })
        res.statusCode = 200;
        res.json(logs.reverse());
      })
  },
  postLog: function(user, name, action) {
    Log.findAll({
      limit: 1,
      order: [['createdAt', 'DESC']],
      where: {user: user}
    }).then(function(entry){
      if(entry.length === 0){
        Log.create({name: name, action: action, user: user})
        .then(function(log) {
          console.log('Created new log.');
        });
      } else if(entry[0].dataValues.action !== 'dead'){
        Log.create({name: name, action: action, user: user})
        .then(function(log) {
          console.log('Created new log.');
        });
      }
    })
  },
  /********** User Functions **********/
  login: function(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;

    User.findOne({ where: {username: username} })
      .then(function(user){
        if (user) {
          user = user.dataValues;
          bcrypt.compare(password, user.password, function(err, match) {
            if (err) {
              console.log('error')
              throw err;
            } else if (match) {
              console.log('Login successful', req.session);
              req.session.regenerate(function() {
                req.session.user = user.username;
                res.send(req.session);
              });
            } else {
              console.log('Wrong password.');
              res.send(req.session.user);
            }
          })
        } else {
          console.log('Username not found.');
          res.send(req.session.user);
        }
      })
  },
  logout: function(req, res, next) {
    req.session.destroy(function() {
      res.redirect('/login');
    });
  },
  signup: function(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    User.find({ where: {username: username} })
      .then(function(user) {
        if (!user) {
          bcrypt.genSalt(10, function(err, salt) {
            if (err) {
              throw err;
            } else {
              bcrypt.hash(password, salt, function(err, hash) {
                if (err) {
                  throw err;
                } else {
                  User.create({username: username, password: hash}).then(function(user) {
                    console.log('Saved user.');
                    user = user.dataValues;
                    req.session.regenerate(function() {
                      req.session.user = user.username;
                      res.send(req.session.user);
                    });
                  });
                }
              })
            }
          })
        } else {
          console.log('Account already exists.');
          res.send(false);
        }
      });
  },
  /********** Authentication Middleware **********/
  checkUser: function(req, res, next) {
    if (!req.session.user) {
      console.log('Must login.');
      res.redirect('/login');
    } else {
      next();
    }
  },


  /********** Test Functions **********/

  // returns all monsters in an array
  getPets: function(req, res, next) {
    console.log('get pets is running');
    Pet.findAll({})
      .then(function(pets) {
        console.log('This is what was found:', pets);
        res.statusCode = 200;
        res.send(pets);
      });
  }
};
