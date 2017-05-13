const db = require('../database/index.js');
const question = require('./question.js');

module.exports.createMessage = function(questionId, username, body) {
  return db.Message.create({
    QuestionId: questionId,
    user: username,
    date: new Date(),
    msg: body
  });
};

module.exports.getMessages = function(questionId) {
  return db.Message.sync()
    .then(() => {
      return db.Message.findAll({
        where: { QuestionId: questionId },
        limit: 10,
        sort: { id: 1 }
      })
    });
  // get the messages that have the room id and use the sort parameter
};

