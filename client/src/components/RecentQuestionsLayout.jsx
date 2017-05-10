import React from 'react';
import RecentQuestions from './RecentQuestions.jsx';
import AskedQuestion from './AskedQuestion.jsx';
import { Switch, Route } from 'react-router-dom';
import Ask from './Ask.jsx';
import Answer from './Answer.jsx';
import Dashboard from './Dashboard.jsx';

const RecentQuestionsLayout = props => (
  <div className="main">
    <RecentQuestions 
      questions={props.questions}
    />
    <Switch>
      <Route exact path="/Ask" render={innerProps => (
        <Ask 
          changeCurrency={props.changeCurrency}
          username={props.username}
          redirect={props.redirect}
        />
      )} />
      <Route exact path="/Dashboard" component={Dashboard} />
      <Route exact path="/Asked/Recent" render={innerProps => (
        <AskedQuestion question={props.currentQuestion} />
      )} />
      <Route path="/Asked/:number" render={innerProps => (
        <AskedQuestion question={props.questions[innerProps.match.params.number]} />
      )} />
    </Switch>
  </div>
);

export default RecentQuestionsLayout;