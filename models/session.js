const db = require('../database/index.js');

module.exports.createSession = function(id, userAgent) {
  return db.Session.sync()
    .then(() => {
      var random = String(Math.random());
      return db.Session.create({
        userid: id,
        cookieNum: random,
        userAgent: userAgent,
        expirationDate: new Date()
      })
    });
};

module.exports.checkIfSessionIsValid = function(session, reqHeader) {
  return db.Session.sync()
    .then(() => {
      return db.Session.findAll({
        where: {
          cookieNum: session
        }
      });
    })
    .then((data) => {
      if (data[0]) {
        var week = 604800000;
        var currentDate = new Date();
        var storedDate = data[0].expirationDate;
          console.log('we got here', data[0].userAgent, reqHeader);
        if (week > currentDate - storedDate) {
          return data[0].userAgent === reqHeader;
        } else {
          data[0].destroy();
        }
      } else if (data) {
        return false;
      }
    });
};