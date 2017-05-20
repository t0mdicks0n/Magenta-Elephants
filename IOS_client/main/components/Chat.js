import React, { Component } from 'react';
import axios from 'axios';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { connect } from 'react-redux';

var serverURL = 'http://107.170.233.12';

class Chat extends Component {

  constructor(props) {
    super(props);
    this.state = {
      messages: []
    }
    this.onSend = this.onSend.bind(this);
    this.onReceive = this.onReceive.bind(this);

    console.log('!!!!!!!!!!! QUESTION ID ', this.props.navigation.state.params.question.id);

    this.ws = new WebSocket(serverURL + ':8080');

    this.ws.onopen = () => {
      console.log('Connection open');
    };

    this.ws.onmessage = (e) => {
      this.onReceive(e.data);
    };
  }

  componentWillMount() {
    console.log('THIS.PROPS IN CHAT', this.props.userInfo)
    var questionData = this.props.navigation.state.params.question;
    var originalQuestion = parseData(
      questionData.Nid_User,
      questionData.questionTitle,
      undefined,
      questionData.Eid_User,
      questionData.username,
      questionData.avatar
    );

    var inputMessages = [originalQuestion];

    axios.get(serverURL + '/questions')
    .then(questions => {
      var messagesFromDb = '';
      
      for (var i = 0; i < questions.data.length; i++) {
        if (questions.data[i].id === this.props.navigation.state.params.question.id) {
          messagesFromDb = questions.data[i].Messages;
        }
      }

      messagesFromDb.forEach(function(message, index, array) {
        var currentMessage = parseData(message.id, message.msg, message.date, message.userId, message.userId, undefined);
        return inputMessages.unshift(currentMessage);
      });

      this.setState({messages: inputMessages});

    })
    .catch(error => {
      console.error('There was an error with GET. Error: ', error);
    })
  }

  onReceive(incMessage) {
    console.log('incoming message ', incMessage);

    incMessage = JSON.parse(incMessage);
    var message = incMessage.msg[0];

    var formatedMessage = parseData(message._id, message.text, message.createdAt, message.user._id, message.user.avatar);

    var newMessages = this.state.messages.slice();
    newMessages.unshift(formatedMessage);
    
    this.setState({
      messages: newMessages
    });
  }

  onSend(messages = []) {
    this.setState((previousState) => {
      return {
        messages: GiftedChat.append(previousState.messages, messages),
      };
    });

    this.ws.send(JSON.stringify({msg: messages, questionId: this.props.navigation.state.params.question.id}));
  }

  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={this.onSend}
        user={{
          _id: this.props.userInfo.id,
          name: this.props.userInfo.username,
          avatar: this.props.userInfo.avatar_url
        }}
      />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  }
});

function parseData(messageID, message, createdAt, userID, userName, userAvatar) {
  if (createdAt === undefined) {
    createdAt = new Date();
  }
  if (userAvatar === undefined) {
    userAvatar = 'https://facebook.github.io/react/img/logo_og.png';
  }
  return {
    _id: messageID,
    text: message,
    createdAt: createdAt,
    user: {
      _id: userID,
      name: userName,
      avatar: userAvatar
    }
  };
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(Chat)