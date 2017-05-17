import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import Stream from './Stream.js';
import testData from './TestData.js';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: []
    }
  }

  componentWillMount () {
    this.setState({
      questions: testData
    });
  }

  render() {
    
    return (
      <View style={styles.container} >
        <Text>This is a test motherfucker</Text>
        <Stream questions={this.state.questions} />
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