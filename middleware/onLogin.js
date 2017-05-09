const Promise = require('bluebird');
const db = Promise.promisifyAll(require('../models/index'));


module.exports = function(req, res, next, body) {
  body = JSON.parse(body);
  return db.User.checkIfUserExists(body.login)
    .then((userid) => {
      if (userid) {
        return userid;
      } else {
        return db.User.createUser(body.login, body.avatar_url).id;
      }
    })
    .then((userid) => {
      return db.Session.createSession(userid, req.headers['user-agent']);
    })
    .then((result) => {
      res.cookie('forum', result.cookieNum, { maxAge: 900000, httpOnly: true });
      res.redirect('/dashboard');
    })
};