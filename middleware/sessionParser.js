const Promise = require('bluebird');
const config = require('../config/vars.js');
const db = Promise.promisifyAll(require('../models/index'));

module.exports = function(req, res, next) {
  var redirectURL = `https://github.com/login/oauth/authorize?client_id=${config.clientID}&state=xUbA6qeu6HvPGPvsOjuZRILAU0Bolgpv&scope=user,repo,gist`;
  if (req.cookies.forum) {
    db.Session.checkIfSessionIsValid(req.cookies.forum, req.headers['user-agent'], res)
      .then((boolean) => {
        if (boolean) {
          next()
        } else {
          res.redirect(redirectURL);
        }
      });
  } else {
    res.redirect(redirectURL);
  }
};