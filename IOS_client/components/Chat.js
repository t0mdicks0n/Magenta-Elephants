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

export default class Chat extends Component {

  constructor(props) {
    super(props);
    this.state = {
      messages: []
    }
    this.onSend = this.onSend.bind(this);
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
  }

  onSend(messages = []) {
    this.setState((previousState) => {
      return {
        messages: GiftedChat.append(previousState.messages, messages),
      };
    });
  }

  render() {
    console.log('my props in Chat ', this.props.navigation.state.params.question)
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

{/*<View style={styles.container} >
  <Text>
    {JSON.stringify()}
  </Text>
</View>*/}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  }
});