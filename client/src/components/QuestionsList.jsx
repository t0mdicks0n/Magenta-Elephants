import React from 'react';
import QuestionsListItem from './QuestionsListItem.jsx';

const QuestionsList = props => (
  <ul className="questionsList">
    { props.questions.map((question, index) =>
      <QuestionsListItem  question={question} index={index} key={index} />
    )}
  </ul>
);

export default QuestionsList;