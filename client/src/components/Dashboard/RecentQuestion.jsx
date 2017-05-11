import React from 'react';
import { Redirect } from 'react-router-dom';

class RecentQuestion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false
    };
    this.changeQuestion = this.changeQuestion.bind(this);
  }

  changeQuestion() {
    this.props.changeProp('currentQuestion', this.props.question);
    this.setState({
      redirect: true
    }); 
  }

  render() {
    if (this.state.redirect) {
      return <Redirect push to="/Asked/Recent" />
    }
    var iconClass = (this.props.question.answered) ? 'fa fa-check' : 'fa fa-times';

    return (
      <li onClick={this.changeQuestion} >
        <h3>{this.props.question.questionTitle}</h3>
        <i className={iconClass}></i>
      </li>
    )
  }
}

export default RecentQuestion;