import React from 'react';
import { render } from 'react-dom';
import Nav from './components/Nav.jsx';
import RecentQuestionsLayout from './components/RecentQuestionsLayout.jsx';
import LiveAnswer from './components/LiveAnswer.jsx';
import Answer from './components/Answer.jsx';
import $ from 'jquery';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
require('!style-loader!css-loader!sass-loader!./sass/all.scss');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      userInfo: {},
      currentQuestion: {},
      redirect: false
    }
    this.changeCurrency = this.changeCurrency.bind(this);
    this.changeProp = this.changeProp.bind(this);
    this.getQuestions = this.getQuestions.bind(this);
    this.getProfileInfo = this.getProfileInfo.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.filter = this.filter.bind(this)
    this.username = document.cookie.substring(document.cookie.indexOf("forumLogin=") + 11);
  }

  componentDidMount() {
    setInterval(this.getQuestions, 5000);
  }

  componentWillMount() {
    this.getQuestions();
    this.getProfileInfo();
  }

  changeProp(key, val) {
    this.setState({
      [key]: val
    });
  }

  changeCurrency(change) {
    var newObj = this.state.userInfo;
    newObj.currentCurrency -= change;
    this.setState({
      userInfo: newObj
    });
  }

  getProfileInfo() { 
    $.get('/users/' + this.username, (req, res) => {})
      .then(results => {
        this.setState({
          userInfo: JSON.parse(results)
        });
      })
      .catch(err => {
        console.log('error in retrieving profile info', err);
      });
  }

  filter(e) {
    if (e.target.value === 'all') {
      this.changeProp('filteredQuestions', this.state.questions);
    } 
    else {
      var filtered = [];
      var questions = this.state.questions;
      for(var i = 0; i < questions.length; i++){
        var tags = questions[i].tags.split(',');
        if(tags.includes(e.target.value)){
          filtered.push(questions[i]);
        }
        if (questions.length - 1 === i){
          this.changeProp('filteredQuestions', filtered);
        }
      }
    }
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

  render() {
    return (
      <BrowserRouter>
        <main>
          <Nav currentCurrency={this.state.userInfo.currentCurrency} />
          <Switch>
            <Route exact path="/Answer" component={Answer} />
            <Route exact path="/LiveAnswer" component={LiveAnswer} />
            <Route render={props => (
              <RecentQuestionsLayout
                changeCurrency={this.changeCurrency}
                username={this.username}
                redirect={this.state.redirect}
                currentQuestion={this.state.currentQuestion}
                questions={this.state.questions}
                filter={this.filter}
              />
            )} />
          </Switch>
        </main>
      </BrowserRouter>
    )
  }
}

render(<App/>, document.getElementById('app'));









