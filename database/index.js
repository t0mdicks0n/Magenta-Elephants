var Sequelize = require('sequelize');
var db = new Sequelize('4um', 'root', '', {
  logging: false
});


module.exports.User = db.define('User', {
  username: Sequelize.STRING,
  avatar_url: Sequelize.STRING,
  currentCurrency: Sequelize.INTEGER,
  totalCurrency: Sequelize.INTEGER
}, {
  timestamps: false
});

module.exports.Question = db.define('Question', {
  questionTitle: Sequelize.STRING,
  questionBody: Sequelize.TEXT,
  answer: Sequelize.TEXT,
  Qid_User: Sequelize.INTEGER,
  Aid_User: Sequelize.INTEGER
}, {
  timestamps: false
});

module.exports.Session = db.define('Session', {
  userid: Sequelize.INTEGER,
  cookieNum: Sequelize.STRING,
  userAgent: Sequelize.STRING,
  expirationDate: Sequelize.DATE
});