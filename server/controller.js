var db = require('../data/database.js');
var Pet = db.Pet;
var User = db.User;

var urls = {
  default: 'http://default.gif',
  coding: 'http://coding.gif'
};

module.exports = {
  get: function(req, res, next) {
    Pet.findOne({})
      .then(function(query) {
        var pet = query.dataValues;
        res.statusCode = 200;
        res.end(JSON.stringify(pet));
      })
  },
  post: function(req, res, next) {
    Pet.findOne({})
      .then(function(pet) {
        if (pet) {
          var newStatus = req.body.status;
          pet.status = newStatus; 
          pet.img = urls[newStatus];
          pet.save().then(function(data) {
            console.log('updated database');
            res.statusCode = 201;
            res.end(JSON.stringify(data.dataValues));
          });
        } else {
          console.log('no pets found!');
        }
      })
  },

  //User Authentication
  login: function(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;

    User.findOne({username: username})
      .then(function(user){
        if(user){
          user = user.dataValues;
          //Update here to hash your password;
          if(password === user.password) {
            req.session.regenerate(function() {
              req.session.user = user;
              res.redirect('/');
            });
          } else {
            console.log('Wrong password');
            res.end();
          }
        } else {
          res.redirect('/login');
        }
      })
      .catch(function(err) {
        console.log(err);
        res.redirect('/login');
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
    User.findOne({username: username})
      .then(function(user){
        user = user.dataValues;
        if (!user) {
          var newUser = new User({
            username: username,
            password: password
          });
          newUser.save().then(function() {
            redirect('/login');
          });
        } else {
          console.log('Account already exists');
          res.redirect('/login');
        }
      });
  }
}