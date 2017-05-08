module.exports.Session = require('./session');
module.exports.Question = require('./question');
module.exports.User = require('./user');

// CREATES FIRST USER IN DATABASE MANUALLY

// db.User.sync()
//   .then(function() {
//     return db.User.create({
//       username: "test12345",
//       currentCurrency: 0,
//       totalCurrency: 0,
//       noviceRating: 0,
//       expertRating:0
//     });
//     // db.User.create({
//     //   username: "john",
//     //   currentCurrency: 0,
//     //   totalCurrency: 0,
//     //   noviceRating: 0,
//     //   expertRating:0
//     // })
//   })
//   .then(function(data) {
//     return db.User.findAll({where: {username: "heliu"}});
//   })
//   .then(function(user) {
//     // console.log('the user', user);
//     user.forEach(function(user) {
//       console.log(user.username + ' exists');
//     });
//     db.close();
//   })
//   .catch(function(err) {
//     console.log(err);
//     db.close();
//   });
