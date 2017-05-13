import React from 'react';
import $ from 'jquery';
import Message from './Message.jsx';

class AnswerQuestion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newMessage: ''
    }
    this.changeProp = this.changeProp.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
  }

  changeProp(key, value) {
    this.setState({
      [key]: value
    });
  }

  sendMessage(e) {
    e.preventDefault();
    this.setState({ newMessage: '' });
    this.props.sendMessage(this.state.newMessage);
  }

  render() {
    return (
      <div>
        {
          this.props.messages.map((message, index) => 
            <Message message={message} key={index} />
          )
        }
        <form onSubmit={this.sendMessage} >
          <input type="text" onChange={ e => this.changeProp('newMessage', e.target.value) } />
          <button type="submit">Submit</button>
        </form>
        <button onClick={this.props.finishQuestion} >Finish Question</button>
      </div>
    )
  }
}

export default AnswerQuestion;