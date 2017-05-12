import React from 'react';
import { render } from 'react-dom';
import Nav from './components/Nav.jsx';
import RecentQuestionsLayout from './components/RecentQuestionsLayout.jsx';
import LiveAnswer from './components/LiveAnswer.jsx';
import Answer from './components/Answer.jsx';
import $ from 'jquery';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import filters from '../../filters.js'
require('!style-loader!css-loader!sass-loader!./sass/all.scss');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      personalInfo: {},
      userInfo: {},
      currentQuestion: {},
    }
    this.changeCurrency = this.changeCurrency.bind(this);
    this.changeProp = this.changeProp.bind(this);
    this.getQuestions = this.getQuestions.bind(this);
    this.getProfileInfo = this.getProfileInfo.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.filter = this.filter.bind(this);
    this.withProps = this.withProps.bind(this);
    this.filters = filters.filters;
    this.username = document.cookie.substring(document.cookie.indexOf("forumLogin=") + 11);
  }

  componentDidMount() {
    setInterval(this.getQuestions, 5000);
  }

  componentWillMount() {
    this.getQuestions();
    this.getProfileInfo('personal');
  }

  changeProp(key, val) {
    this.setState({
      [key]: val
    });
  }

  changeCurrency(change) {
    var newObj = this.state.personalInfo;
    newObj.currentCurrency -= change;
    this.setState({
      personalInfo: newObj
    });
  }

  getProfileInfo(type) { 
    $.get('/users/' + this.username, (req, res) => {})
      .then(results => {
        console.log('success');
        this.setState({
          [type + "Info"]: JSON.parse(results)
        });
      })
      .catch(err => {
        console.log('error in retrieving profile info', err);
      });
  }

  getQuestions() {
    $.get('/questions', (req, res) => {})
      .then(results => {
        this.changeProp('questions', results)
      })
      .catch(err => {
        console.log('there was an error with get ', err)
      });
  }

  filter(e) {
    if (e.target.value === 'all') {
      this.state.questions.forEach( question => {
        if ($('#' + question.id).hasClass('hidden')) {
          $('#' + question.id).removeClass('hidden');
        }
      })
    } 
    else {
      this.state.questions.forEach( question => {
        var tags = question.tags.split(',');
        if (!tags.includes(e.target.value)) {
          $('#' + question.id).addClass('hidden');
        } 
        else {
          $('#' + question.id).removeClass('hidden')
        }
      })
    }
  }

  withProps(Component, props) {
    return function(matchProps) {
      return <Component {...props} {...matchProps} />
    }
  }

  render() {
    const AnswerPage = (props) => {
      return (
        <Answer 
          questions={this.state.questions} 
        />
      );
    }
    return (
      <BrowserRouter>
        <main>
          <Nav currentCurrency={this.state.personalInfo.currentCurrency} />
          <Switch>
            <Route path="/Answer/:number" render={this.withProps(Answer, {questions: this.state.questions})}/>
            <Route exact path="/LiveAnswer" component={LiveAnswer} />
            <Route render={props => (
              <RecentQuestionsLayout
                personalInfo={this.state.personalInfo}
                changeCurrency={this.changeCurrency}
                changeProp={this.changeProp}
                username={this.username}
                redirect={this.state.redirect}
                currentQuestion={this.state.currentQuestion}
                questions={this.state.questions}
                filter={this.filter}
                filters={this.filters}
              />
            )} />
          </Switch>
        </main>
      </BrowserRouter>
    )
  }
}

render(<App/>, document.getElementById('app'));









