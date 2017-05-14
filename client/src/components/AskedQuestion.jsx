import React from 'react';

class AskedQuestion extends React.Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps, nextState) {
    // console.log('the next stuff', nextProps, nextState);
    return true;
  }

  render() {
    return (
      <section className="answer">
        <h1 className="headline">{this.props.question.questionTitle}</h1>
        <p className="askedQuestionDescription">{this.props.question.questionBody}</p> 
      </section>
    )
  }
};

export default AskedQuestion;