var Pet = require('../data/database.js').Pet;

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
  }
}