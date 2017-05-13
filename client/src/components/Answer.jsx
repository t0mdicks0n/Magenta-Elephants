import React from 'react';
import AnswerQuestion from './AnswerQuestion.jsx';
import AskedQuestion from './AskedQuestion.jsx';
import $ from 'jquery';

class Answer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      messages: []
    };
    this.recieveMessage = this.recieveMessage.bind(this);
    this.finishQuestion = this.finishQuestion.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
  }

  componentWillMount() {
    $.ajax({
      type: 'GET',
      url: '/messages/' + this.props.question.id,
      success: (data) => {
        console.log('the messages!', data, typeof data);
        this.setState({ messages: JSON.parse(data) });
      },
      error: (err) => {
        console.log('error with submitting answer', err);
      }
    });
  }

  recieveMessage(data) {
    var messages = this.state.messages;
    console.log('the data', data);
    messages.push({ user: data.user, msg: data.msg });
    this.setState({ messages: messages });
  }

  componentDidMount() {
    this.socket = io('/' + this.props.question.id);
    this.socket.emit('new user', this.props.username, () => {});
    this.socket.on('new message', (e) => {
      this.recieveMessage(e);
    });
  }

  finishQuestion() {
    this.socket.emit('finish');
    this.props.changeUserCurrency(this.props.question.price);
  }

  sendMessage(value) {
    this.socket.emit('new message', {msg: value, user: this.props.username});
    var newMessage = {
      username: this.props.username,
      body: value,
      questionId: this.props.question.id
    };
    $.ajax({
      type: 'POST',
      url: '/messages',
      data: newMessage,
      success: (data) => {
        console.log('success!', data);
      },
      error: (err) => {
        console.log('error with sending message', err);
      }
    });
  }

  render () {
    return (
      <section className="main">
        <AskedQuestion question={this.props.question}/>
        <AnswerQuestion 
          sendMessage={this.sendMessage} 
          messages={this.state.messages} 
          finishQuestion={this.finishQuestion}
        /> 
      </section>
    )
  }
}

export default Answer;