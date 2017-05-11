import React from 'react';
import RecentQuestions from './RecentQuestions.jsx';
import AskedQuestion from './AskedQuestion.jsx';
import { Switch, Route } from 'react-router-dom';
import Ask from './Ask.jsx';
import Answer from './Answer.jsx';
import Dashboard from './Dashboard/Dashboard.jsx';

const RecentQuestionsLayout = props => (
  <div className="main">
    <RecentQuestions 
      questions={props.questions}
      filters={props.filters}
      filter={props.filter}
    />
    <Switch>
      <Route exact path="/Ask" render={innerProps => (
        <Ask 
          changeCurrency={props.changeCurrency}
          changeIndexProp={props.changeProp}
          username={props.username}
          filter={props.filter}
          filters={props.filters}
          questions={props.questions}
          redirect={props.redirect}
        />
      )} />
      <Route exact path="/Dashboard" render={innerProps => (
        <Dashboard 
          userInfo={props.personalInfo}
          changeProp={props.changeProp}
        /> 
      )} />
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