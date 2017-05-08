const db = require('../database/index.js');

module.exports.createUser = function(username, avatar_url) {
  return db.User.sync()
    .then(() => {
      return db.User.create({
        username: username,
        avatar_url: avatar_url,
        currentCurrency: 100,
        totalCurrentcy: 100
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