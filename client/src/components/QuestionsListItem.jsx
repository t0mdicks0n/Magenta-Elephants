import React from 'react';
import { Link } from 'react-router-dom';

const QuestionListItem = props => (
  <Link to={"/Asked/" + props.index}>
    <li id={props.question.id} >
      <div>
        <img className="questionImage" src={props.question.avatar} />
        <div>
          <h3 className="username">{props.question.username}:</h3>
          <h3 className="questionTitle">{props.question.questionTitle}</h3>
          <Link to="/Answer"><button className="answerQuestion">Answer</button></Link>
        </div>
      </div>
    </li>
  </Link>
);

export default QuestionListItem;