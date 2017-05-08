import React from 'react';
import QuestionsListItem from './QuestionsListItem.jsx';

const QuestionsList = props => (
  <ul className="questionsList">
    { props.questions.map( question =>
      <QuestionsListItem changeRight={props.changeRight} question={question} />
    )}
  </ul>
);

export default QuestionsList;