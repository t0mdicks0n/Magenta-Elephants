import React from 'react';
import RecentQuestion from './RecentQuestion.jsx';

const RecentQuestionsList = props => (
  <ul className="recentQuestionsList">
    { props.questions.map((question, index) =>
      <RecentQuestion 
        question={question}
        changeProp={props.changeProp} 
        index={index} 
        key={index} 
      />
    )}
  </ul>
);

export default RecentQuestionsList;