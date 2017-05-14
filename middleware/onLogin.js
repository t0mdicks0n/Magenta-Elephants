const Promise = require('bluebird');
const db = Promise.promisifyAll(require('../models/index'));


module.exports = function(req, res, next, body) {
  body = JSON.parse(body);
  return db.User.checkIfUserExists(body.login)
    .then((userid) => {
      if (userid) {
        return userid;
      } else {
        return db.User.createUser(body.login, body.avatar_url, body.bio)
          .then((user) => {
            return user.dataValues.id;
          })
      }
    })
    .then((userid) => {
      // these cookies are terrible sercurity vulnerabilities, so if you are working on this as a legacy I'd recommend fixing them
      res.cookie('forumId', userid);
      return db.Session.createSession(userid, req.headers['user-agent']);
    })
    .then((result) => {
      res.cookie('forumNumber', result.cookieNum, { maxAge: 90000, httpOnly: false });
      res.cookie('forumLogin', body.login, {maxAge: 90000 });
      res.redirect('/dashboard');
    })
};