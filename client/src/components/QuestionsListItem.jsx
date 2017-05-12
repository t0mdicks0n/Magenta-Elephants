import React from 'react';
import { Link } from 'react-router-dom';

class QuestionListItem extends React.Component {
  constructor(props) {
    super(props);
    this.id = this.props.question.id;
  }

  render() {
    var iconClass = (this.props.question.answered) ? 'fa fa-check' : 'fa fa-times';
    
    return (
      <Link to={"/Asked/" + this.props.index}>
      
        <li className="recentQuestion" id={this.props.question.id}>
          <div>
            <img className="questionImage" src={this.props.question.avatar} />
            <div>
              <h3 className="username">{this.props.question.username}:</h3>
              <h3 className="questionTitle">{this.props.question.questionTitle}</h3>
              <Link to={"/Answer/" + this.props.question.id}>
                <button className="answerQuestion">Answer</button>
              </Link>
              <i className={iconClass}></i>
            </div>
          </div>
        </li>
      </Link>  
    )
  }
}

export default QuestionListItem;