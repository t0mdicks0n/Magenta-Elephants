const db = require('../database/index.js');

// EXAMPLE USAGE OF UPDATE QUESTION:
// updateQuestion(3, 1, 'this is another example answer!!!');

module.exports.updateQuestion = function(questionId, expertId, answer, res) {
  db.Question.sync()
    .then(() => {
      return db.Question.findAll({
        where: { id: questionId }
      })
    })
    .then((data) => {
      return data[0].update({
        answer: answer,
        Aid_User: expertId
      })
    })
    .then((data) => {
      db.close();
      res.end('success!');
    });
}

// EXAMPLE USAGE OF CREATE NEW QUESTION
// createNewQuestion('heliu', 'is the sky blue?', 'yes it is blue.');

module.exports.createNewQuestion = function(username, title, body) {
  db.Question.sync()
    .then(() => {
      return db.User.findAll({
        where: { username: username }
      })
    })
    .then((user) => {
      return db.Question.create({
        Qid_User: user[0].id,
        questionTitle: title,
        questionBody: body
      })
    })
    .catch((err) => {
      // I have not added actual error catching yet
      console.log(err);
      db.close();
    });
};
