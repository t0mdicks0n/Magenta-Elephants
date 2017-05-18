import React, { Component } from 'react';
import axios from 'axios';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';
import { StackNavigator } from 'react-navigation';

export default class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentWillMount () {

  }

  render() {
    return (
      <View style={styles.container} >
        <Text>
          Test
        </Text>
      </View>
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