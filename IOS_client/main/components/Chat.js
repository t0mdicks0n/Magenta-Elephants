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

// import SocketIOClient from 'socket.io-client';
// import SocketIO from 'react-native-socketio';

export default class Chat extends Component {

  constructor(props) {
    super(props);
    this.state = {
      messages: []
    }
    this.onSend = this.onSend.bind(this);

    console.log('!!!!!!!!!!! QUESTION ID ', this.props.navigation.state.params.question.id);

    this.ws = new WebSocket('http://localhost:8080/');

    this.ws.onopen = () => {
      console.log('Connection open');
    };

    this.ws.onmessage = (e) => {
      console.log('message from the socket-integration was received! ', e.data);
    };
  }

  componentWillMount() {
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
    questionData.Messages.forEach(function(message, index, array) {
      var currentMessage = parseData(message.id, message.msg, message.date, message.userId, message.userId, undefined);
      return inputMessages.unshift(currentMessage);
    });

    this.setState({messages: inputMessages});
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
          _id: 100,
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