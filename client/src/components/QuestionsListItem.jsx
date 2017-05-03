import React from 'react';

const QuestionListItem = props => (
  <li>
    <div>
      <img src="https://placeholdit.imgix.net/~text?txtsize=9&txt=100%C3%97100&w=100&h=100" />
      <div>
        <h3 className="username">Oliver Ullman:</h3>
        <h3 className="questionTitle">Is it okay that I don't shower after a workout?</h3>
        <button className="answerQuestion">Answer</button>
      </div>
    </div>
  </li>
);

export default QuestionListItem;