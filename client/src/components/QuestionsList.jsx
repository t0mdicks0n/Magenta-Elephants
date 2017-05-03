import React from 'react';
import QuestionsListItem from './QuestionsListItem.jsx';

const QuestionsList = props => (
  <ul className="questionsList">
    <QuestionsListItem />
    <QuestionsListItem />
    <QuestionsListItem />
  </ul>
);

export default QuestionsList;