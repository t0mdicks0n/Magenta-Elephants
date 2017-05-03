var Sequelize = require('sequelize');
var db = new Sequelize('4um', 'root', '');

var User = db.define('User', {
  username: Sequelize.STRING,
  currentCurrency: Sequelize.INTEGER,
  totalCurrency: Sequelize.INTEGER,
  noviceRating: Sequelize.INTEGER,
  expertRating: Sequelize.INTEGER
});

var Question = db.define('Question', {
  question: Sequelize.TEXT,
  answer: Sequelize.TEXT,
  QUser_id: Sequelize.STRING,
  AUser_id: Sequelize.STRING
});

User.sync()
  .then(function() {
    User.create({
      username: "heliu",
      currentCurrency: 0,
      totalCurrency: 0,
      noviceRating: 0,
      expertRating:0
    })
  })
  .then(function() {
    return User.findAll({where: {username: "heliu"}});
  })
  .then(function(user) {
    User.forEach(function(user) {
      console.log(user.username + ' exists');
    });
    db.close();
  })
  .catch(function(err) {
    console.log(err);
    db.close();
  });

  // Question.sync()
  // .then(function() {
  //   User.create({})
  // })
  // .then(function() {
  //   return User.findAll({where: {username: "heliu"}});
  // })
  // .then(function(user) {
  //   User.forEach(function(user) {
  //     console.log(user.username + ' exists');
  //   });
  //   db.close();
  // })
  // .catch(function(err) {
  //   console.log(err);
  //   db.close();
  // });