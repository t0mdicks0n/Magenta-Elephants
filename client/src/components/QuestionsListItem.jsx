import React from 'react';

const QuestionListItem = props => (
  <li onClick={props.changeRight} >
    <div>
      <img className="questionImage" src={props.question.avatar} />
      <div>
        <h3 className="username">{props.question.username}:</h3>
        <h3 className="questionTitle">{props.question.title}</h3>
        <button className="answerQuestion">Answer</button>
      </div>
    </div>
  </li>
);

export default QuestionListItem;