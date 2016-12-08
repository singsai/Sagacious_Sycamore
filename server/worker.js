var Pet = require('../data/database.js').Pet;

var updateDB = function(db) {
  db.save().then(function() {
    console.log('database updated');
  })
  return;
};

module.exports = {
  tidy: function() {
    Pet.findOne({}).then(function(query) {
      var pet = query.dataValues;
      
      switch (pet.status) {
        case 'coding':
          pet.experience = pet.experience + 1;
        case: 'eating':
          pet.feed = pet.feed + 2;
          pet.health = pet.health + 2;
          break;
        case: 'playing':
          pet.health = pet.health + 1;
          pet.love = pet.love + 1;
        case: 'sleeping':
          pet.health = pet.health + 1;
          pet.love = pet.love + 1;
          pet.experience = pet.experience + 1;
        default:
          pet.feed = pet.feed - 1;
          break;
      }
      //if dead, run only this
      if (pet.health === 0 || pet.feed === 0) {
        pet.status = 'dead';
        pet.phys = 'dead';
        pet.mood = 'dead';
        //update db
        return updateDB(pet);
      } 
      //check level before anything else
      if (pet.experience > 100) {
        pet.level = pet.level + 1;
        pet.experience = 0;
      }
      //then update values
      if (pet.health < 3) {
        pet.status = 'sick';
        pet.phys = 'sick';
        pet.mood = 'sad';
        //update db
        return updateDB(pet);
      } else if (pet.feed < 3) {
        pet.phys = 'hungry';
        pet.mood = 'grumpy'
      } else if (pet.health > 8) {
        pet.phys = 'healthy';
        pet.mood = 'feeling awesome';
      } else if (pet.feed > 8) {
        pet.status = 'sick';
        pet.phys = 'obese';
        pet.mood = 'bloated';
        //update db
        return updateDB(pet);
      } else if (pet.love > 8) {
        pet.status = 'happy';
        pet.phys = 'great';
        pet.mood = 'feeling loved';
        //update db
        return updateDB(pet);
      } else if (pet.love < 2) {
        pet.status = 'runaway';
        pet.phys = 'unknown';
        pet.mood = 'unknown';
        //update db
        return updateDB(pet);
      }

      pet.status = 'normal';
      //update db 
      return updateDB(pet);
    }); 
  }
}