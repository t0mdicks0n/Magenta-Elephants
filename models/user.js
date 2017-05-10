const db = require('../database/index.js');

module.exports.createUser = function(username, avatar_url) {
  return db.User.sync()
    .then(() => {
      return db.User.create({
        username: username,
        avatar_url: avatar_url,
      })
    });
};

module.exports.checkIfUserExists = function(username) {
  return db.User.sync()
    .then(() => {
      return db.User.findAll({
        where: {
          username: username
        }
      });
    })
    .then((data) => {
      if (data[0]) {
        return data[0].id;
      } else {
        return false;
      }
    });
};

module.exports.updateCurrency = function(username, change) {
  return db.User.sync()
    .then(() => {
      return db.User.findOne({
        where: { username: username }
      });
    })
    .then((user) => {
      if (change > 0) {
        return user.update({
          currentCurrency: user.currentCurrency + change,
          totalCurrency: user.currentCurrency + change
        });
      } else {
        return user.update({
          currentCurrency: user.currentCurrency + change
        });
      }
    });
};

module.exports.getUserInfo = function(username) {
  var user;
  return db.User.sync()
    .then(() => {
      return db.User.findOne({ where: { username: username } });
    })
    .then((result) => {
      if (result) {
        user = result.dataValues;
      } else {
        throw 'user not found';
      }
      return module.exports.getRating('novice', username);
    })
    .then((noviceRating) => {
      user.noviceRating = noviceRating;
      return module.exports.getRating('expert', username);
    })
    .then((expertRating) => {
      user.expertRating = expertRating;
      return user;
    })
    .catch((err) => {
      console.log('err!', err);
    });
};

module.exports.getRating = function(type, username) {
  return db.Question.sync()
    .then(() => {
      db.User.findOne({
        where: { username: username }
      });
    })
    .then((userid) => {
      var parameter = (type === 'expert') ? 'E' : 'N';
      return db.Question.findAll({
        where: {
          [parameter + 'id_User']: userid
        }
      });
    })
    .then((result) => {
      var totalRatings = 0;
      var totalScore = 0;
      for (var i = 0; i < result.length; i++) {
        if (result[i][type + 'Rating']) {
          totalRatings++;
          totalScore += result[i][type + 'Rating'];
        }
      }
      return (totalScore === 0 && totalRatings === 0) ? 0 : totalScore / totalRatings;
    });
};


// EXAMPLE USAGE OF GET RATING:
// THE TWO TYPES ARE expert AND novice
// IT IS CRUCIAL THAT THEY ARE NOT CAPITALIZED
// getRating('novice', 1)
//   .then((data) => {
//     console.log(' the data', data);
//   })