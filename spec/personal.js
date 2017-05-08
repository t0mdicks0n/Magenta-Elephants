const expect = require('chai').expect;
const chai = require('chai');
const httpMocks = require('node-mocks-http');
const chaiHttp = require('chai-http');
const Sequelize = require('sequelize');
const request = require('request');
const login = require('../middleware/login.js');
const db = require('../models/index');
const directDb = require('../database/index');
const mysql = require('mysql');

chai.use(chaiHttp);

// test table allows unique usernames

var clearDB = function(connection, tablenames, done) {
  var count = 0;
  tablenames.forEach(function(tablename) {
    connection.query('DROP TABLE IF EXISTS ' + tablename, function() {
      count++;
      if (count === tablenames.length) {
        return done();
      }
    })
  })
};

describe('authentication', function() {
  it('redirects to /callback when no cookies are attached', function(done) {
    chai.request('http://localhost:3000').
      get('/').
      end((err, res) => { 
        expect(res).to.redirect;
        done();
      });
  })

  it('does not redirect when cookies are attached', function(done) {
    directDb.Session.sync()
      .then(() => {
        return db.Session.createSession(1, '4um'); 
      })
      .then((result) => {
        chai.request('http://localhost:3000').
          get('/').
          set('Cookie', `forum=${result.cookieNum}`).
          set('user-agent', '4um').
          end((err, res) => { 
            expect(res).to.not.redirect;
            done();
          });
      })

  });
});


describe('Successfully authenticating through github', function() {
  var dbConnection;
  var tableNames = ['Sessions', 'Users'];
  beforeEach(function(done) {
    dbConnection = mysql.createConnection({
      user: 'root',
      password: '',
      database: '4um'
    });
    dbConnection.connect(function(err) {
      if (err) {
        return done(err);
      } else {
        clearDB(dbConnection, tableNames, done);
      }
    });
  })

  it('creates a new user record', function(done) {
    var dummyUser = 'exampleUser';
    var dummyBody = JSON.stringify({
      login: dummyUser,
      avatar_url: 'http://fake-example-url'
    });

    var request = httpMocks.createRequest({
      method: 'GET',
      headers: {
        'user-agent': 'example-user-agent'
      }
    });

    var response = httpMocks.createResponse();

    login.onSuccess(request, response, function() {
      db.User.checkIfUserExists(dummyUser)
        .then((data) => {
          expect(data).to.be.an('number');
          done();
        })
    }, dummyBody);
  });

  it('does not create a new user record if one already exists', function(done) {
    var dummyUser = 'exampleUser';
    var dummyBody = JSON.stringify({
      login: dummyUser,
      avatar_url: 'http://fake-example-url'
    });

    var request = httpMocks.createRequest({
      method: 'GET',
      headers: {
        'user-agent': 'example-user-agent'
      }
    });

    var response = httpMocks.createResponse();

    login.onSuccess(request, response, function() {
      login.onSuccess(request, response, function() {
        directDb.User.sync()
          .then(() => {
            return directDb.User.findAll(); 
          })
          .then((data) => {
            expect(data.length).to.equal(1);
            done();
          })
      }, dummyBody);
    }, dummyBody);
  });

  it('attaches a cookie that is stored in the sessions database', function(done) {
    var dummyUser = 'exampleUser';
    var dummyBody = JSON.stringify({
      login: dummyUser,
      avatar_url: 'http://fake-example-url'
    });

    var request = httpMocks.createRequest({
      method: 'GET',
      headers: {
        'user-agent': 'example-user-agent'
      }
    });

    var response = httpMocks.createResponse();

    login.onSuccess(request, response, function() {
      var cookieVal = response.cookies.forum.value;
      done();


    }, dummyBody);
  });

});


