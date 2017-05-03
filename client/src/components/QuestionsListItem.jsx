import React from 'react';

const QuestionListItem = props => (
  <li>
    <div>
      <h3 className="username">Oliver Ullman</h3>
      <h4 className="questionTitle">How often do you brush your teeth?</h4>
      <button className="answerQuestion">Answer</button>
    </div>
  </li>
);

export default QuestionListItem;