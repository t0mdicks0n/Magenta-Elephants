import React from 'react';
import AnswerQuestion from './AnswerQuestion.jsx';
import AskedQuestion from './AskedQuestion.jsx';

class Answer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      id: Number(this.props.match.params.number),
      question: {}
    }
    this.changeProp = this.changeProp.bind(this);
    this.findQuestion = this.findQuestion.bind(this);
  }
  componentWillMount(){
    this.findQuestion();
  }

  changeProp(key, val) {
    this.setState({
      [key]: val
    });
  }

  findQuestion() {
    this.props.questions.forEach(question => {
      if (this.state.id === question.id) {
        this.changeProp('question', question);
      }
    })
  }

  render () {
    return (
      <section className="main">
      <div className="giveAnswer">
        <AskedQuestion question={this.state.question}/>
      </div>
      <div className="giveAnswer">
        <AnswerQuestion /> 
      </div>  
      </section>
    )
  }
}

export default Answer;