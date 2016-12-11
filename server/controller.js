var db = require('../data/database.js');
var Pet = db.Pet;
var User = db.User;
var bcrypt = require('bcryptjs');

var lvl1 = {
  coding: "http://i.imgur.com/KTNujjY.gif",
  sleeping: "http://i.imgur.com/PujjsmB.gif",
  playing: "http://i.imgur.com/T99KqDs.gif",
  eating: "http://i.imgur.com/W8UQN1M.gif"
};

var lvl2 = {
  coding: 'http://i.giphy.com/3oriO1ACIKLSY565q0.gif',
  sleeping: 'http://i.giphy.com/l2JhIsdeKTn5IPQCQ.gif',
  playing: 'http://i.giphy.com/3oriNVPP3ax7b6Ryg0.gif',
  eating: 'http://i.giphy.com/l0MYBdxsQBG15bLTq.gif'
}

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
    Pet.destroy({ where: {} });
    Pet.create({ name: name })
      .then(function(pet) {
        console.log('Created new pet.');
        res.end();
      });
  },

  //User Authentication
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
              console.log('Login successful');
              req.session.regenerate(function() {
                req.session.user = user.username;
                res.redirect('/home');
                res.end();
              });
            } else {
              console.log('Wrong password');
              res.redirect('/login');
              res.end();
            }
          })
        } else {
          console.log('Username not found');
          res.redirect('/login');
          res.end();
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
                  User.create({username: username, password: hash}).then(function() {
                    console.log('Saved user.');
                    req.session.regenerate(function() {
                      req.session.user = username;
                      res.redirect('/home');
                      res.end();
                    });
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
  },

  checkUser: function(req, res, next) {
    if (!req.session.user) {
      console.log('must login');
      res.redirect('/login');
    } else {
      console.log('logged in as', req.session.user);
      next();
    }
  }
}