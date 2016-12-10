var db = require('../data/database.js');
var Pet = db.Pet;
var User = db.User;
var bcrypt = require('bcryptjs');

var lvl1 = {
  default: 'https://giphy.com/gifs/l0MYBdxsQBG15bLTq',
  coding: 'https://giphy.com/gifs/3oriO1ACIKLSY565q0',
  sleeping: 'https://giphy.com/gifs/l2JhIsdeKTn5IPQCQ',
  playing: 'https://giphy.com/gifs/3oriNVPP3ax7b6Ryg0',
  dead: 'https://giphy.com/gifs/3oriOiymG0a1KVOjC0',
  sick: 'https://giphy.com/gifs/l0MYrEAYrIRmqoDVS',
  happy: 'https://giphy.com/gifs/3oriOcp0gWoE0ZpECA',
  eating: 'https://giphy.com/gifs/l0MYBdxsQBG15bLTq'
}

var lvl2 = {
  normal: 'https://giphy.com/gifs/3oriO8JJtEUpvOYm08',
  coding: 'https://giphy.com/gifs/3oriO1ACIKLSY565q0',
  runaway: 'https://giphy.com/gifs/l0HlyXWFwaJ942luo',
  dead: 'https://giphy.com/gifs/3o6Ztqhekyhz1gsH0k',
  sick: 'https://giphy.com/gifs/l0MYrEAYrIRmqoDVS',
  happy: 'https://giphy.com/gifs/3o6ZtoD5DyQhBb9zTq'
};

var urls = {
  lvl1: lvl1,
  lvl2: lvl2
}

module.exports = {
  get: function(req, res, next) {
    Pet.findOne({})
      .then(function(query) {
        var pet = query.dataValues;
        res.statusCode = 200;
        res.json(pet);
      })
  },
  post: function(req, res, next) {
    Pet.findOne({})
      .then(function(pet) {
        if (pet) {
          var newStatus = req.body.status;
          pet.status = newStatus; 
          console.log('img', urls['lvl'+ pet.level][newStatus]);
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
    Pet.destroy({ where: {} });
    Pet.create({ name: name })
      .then(function(pet) {
        console.log('Created new pet.');
        res.end();
      });
  },

  //User Authentication
  login: function(req, res, next) {
    console.log('reqbody', req.body);
    var username = req.body.username;
    var password = req.body.password;


    User.findOne({ where: {username: username} })
      .then(function(user){
        console.log('in here?')
        if (user) {
          user = user.dataValues;
          //Update here to hash your password;
          bcrypt.compare(password, user.password, function(err, match) {
            if (err) {
              console.log('error')
              throw err;
            } else if (match) {
              console.log('Login successful');
              req.session.regenerate(function() {
                req.session.user = user.username;
                res.redirect('/');
                res.end();
              })
            } else {
              console.log('Wrong password');
              res.redirect('/');
              res.end();
            }
          })
        } else {
          console.log('Username not found');
          res.redirect('/');

          res.end();
        }
      })
      .catch(function(err) {
        console.log(err);
        res.redirect('/');
        res.end();
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
                  User.create({username: username, password: hash}).then(function() {
                    console.log('Saved user.');
                    res.redirect('/login');
                  });
                }
              })
            }
          })          
        } else {
          console.log('Account already exists');
          res.redirect('/login');
        }
      });
  }
}