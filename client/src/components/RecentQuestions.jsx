import React from 'react';
import QuestionsList from './QuestionsList.jsx';

const RecentQuestions = props => (
  <section className="recentQuestions">
    <h1 className="headline">Recent Questions</h1>
    <select onChange={ e => props.filter(e)} >
      <option value="all">Choose a filter...</option>
      {props.filters.map(filter => 
        <option value={filter.id} key={filter.id} >{filter.title}</option>
      )}
    </select>
    <QuestionsList questions={props.questions} filters={props.filters} />
  </section>
);

export default RecentQuestions;