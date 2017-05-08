const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const Promise = require('bluebird');
const db = Promise.promisifyAll(require('../models/index'));
const request = require('request');
const config = require('../config/vars.js');
const login = require('../middleware/login.js');
const port = process.env.PORT || 3000;
const app = express();

process.env.PWD = process.cwd();

app.use(cookieParser());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.get('/questions', function (req, res) {
  db.Question.retrieveAll(res, arr => {res.send(arr)})
});


app.get('/', function(req, res, next) {
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


});

// THIS IS A REDIRECT WHEN THE USER SIGNS IN WITH GITHUB

app.get('/callback', function(req, res, next) { 
  var code = req.query.code;
  var url = `https://github.com/login/oauth/access_token?client_id=${config.clientID}&redirect_uri=http://localhost:3000/callback&client_secret=${config.clientSecret}&code=${code}`;

  request.post(url, function(err, httpResponse, body) {
    var accessToken = body.substring(13);
    var options = {
      url: `https://api.github.com/user?access_token=${accessToken}`,
      headers: {
        'User-Agent': '4um'
      }
    };

    request.get(options, function(err, httpResponse, body) {
      login.onSuccess(req, res, next, body);
    });
  });

});


// EXAMPLE DATA SENT FOR A POST TO /QUESTIONS
/* {
*    username: 'Oliver',
*    title: 'Why is Oliver so Awesome?',
*    body: 'This is an example body' 
*  }
*/

app.post('/questions', function(req, res) {
  db.Question.createNewQuestion(req.body.username, req.body.title, req.body.body);
  res.end();
});

// EXAMPLE DATA SENT FOR A PUT TO /QUESTIONS
/* {
*    questionId: 2, 
*    expertId: 1,
*    answer: 'this is an example answer'
*  }
*/

app.put('/questions', function(req, res) {
  db.Question.updateQuestion(req.body.questionId, req.body.expertId, req.body.answer, res);
});

app.use(express.static(process.env.PWD + '/client'));
app.listen(port, function() {
  console.log('Listening on port 3000 the dirname is', process.env.PWD + '/../client');
});
