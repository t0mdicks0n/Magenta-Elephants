import React from 'react';
import {render} from 'react-dom';
import Nav from './components/Nav.jsx';
import Answer from './components/Answer.jsx';
import RecentQuestions from './components/RecentQuestions.jsx';
import Ask from './components/Ask.jsx';
import $ from 'jquery';
require("!style-loader!css-loader!sass-loader!./sass/all.scss");

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      answerDisplayClass: 'invisible',
      askDisplayClass: 'block',
      askTitle: '',
      askBody: ''
    }
    this.createQuestion = this.createQuestion.bind(this);
    this.changeRight = this.changeRight.bind(this);
    this.changeProp = this.changeProp.bind(this);
    this.getQuestions = this.getQuestions.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {
    setInterval(this.getQuestions, 5000);
  }

  componentWillMount() {
    this.getQuestions();
  }

  changeProp(key, val) {
    this.setState({
      [key]: val
    });
  }

  getQuestions() {
    $.get('/questions', (req, res) => {})
    .then(results => {
      results.reverse();
      this.changeProp('questions', results)
    })
    .catch(err => {
      console.log('there was an error with get ', err)
    })
  }

  changeRight() {
    if (this.state.answerDisplayClass === 'invisible') {
      this.setState({
        answerDisplayClass: 'block',
        askDisplayClass: 'invisible'
      });
    } else {
      this.setState({
        answerDisplayClass: 'invisible',
        askDisplayClass: 'block'
      });
    }
  }

  createQuestion(e) {
    e.preventDefault();
    e.stopPropagation();
    var obj = {
      username: 'heliu',
      title: this.state.askTitle,
      body: this.state.askBody 
    };

    $.ajax({
      type: 'POST',
      url: '/questions',
      data: obj,
      success: (data) => {
        console.log('success!', data)
      },
      error: (err) => {
        console.log('error with submitting answer', err)
      }
    })
  }

  submitAnswer() {
    $.ajax({
      type: 'POST',
      url: '/answer',
      data: JSON.stringify(data),
      success: (data) => {
        console.log('success!', data)
      },
      error: (err) => {
        console.log('error with submitting answer', err)
      }
    })
  }

  render() {
    return (
      <main>
        <Nav />
        <RecentQuestions 
          changeRight={this.changeRight} 
          questions={this.state.questions}
        />
        <Ask 
          askDisplayClass={this.state.askDisplayClass} 
          createQuestion={this.createQuestion} 
          askTitle={this.state.askTitle}
          askBody={this.state.askBody}
          changeProp={this.changeProp}
        />
        <Answer 
          answerDisplayClass={this.state.answerDisplayClass} 
          submitAnswer={this.submitAnswer}
          updateQuestion={this.updateQuestion}
        />
      </main>
    )
  }
}

render(<App/>, document.getElementById('app'));