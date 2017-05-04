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
      answerDisplayClass: 'invisible',
      askDisplayClass: 'block'
    }
    this.changeRight = this.changeRight.bind(this);
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
        <RecentQuestions changeRight={this.changeRight} />
        <Ask askDisplayClass={this.state.askDisplayClass} />
        <Answer answerDisplayClass={this.state.answerDisplayClass} submitAnswer={this.submitAnswer}/>
      </main>
    )
  }
}

render(<App/>, document.getElementById('app'));