import React, { Component } from 'react';
import axios from 'axios';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';
import Stream from './Stream.js';
import testData from './TestData.js';
import QuestionInput from './QuestionInput.js';
import { connect } from 'react-redux';
import t from 'tcomb-form-native';


var serverURL = 'http://107.170.233.12';

const Form = t.form.Form;

const Question = t.struct({
  question: t.String
});

const options = {};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      questionInput: ''
    }
    this.onButtonPress = this.onButtonPress.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  componentWillMount () {
    // console.log('this.props in App', this.props);
    // Get feed from server using http GET request.
    axios.get(serverURL + '/questions')
    .then(questions => {
      console.log('Received question from server.', questions);
      this.setState({
        questions: questions.data
      });
    })
    .catch(error => {
      console.error('Unable to receive response from server GET /questions.');
    })
  }

  handleInput (text) {
    this.setState({
      questionInput: text
    });
  }

  onButtonPress () {
    console.log('The user asked for: ' + this.state.questionInput);
    console.log('this.props in App.js', this.props.userInfo);
    var headers = {
      tags: 'ios',
      username: this.props.userInfo.username,
      title: this.state.questionInput,
      body: '',
      price: '10',
      minExpertRating: '10'
    }

    axios.post(serverURL + '/questions', headers)
    .then(response => {
      console.log(response);
      this.componentWillMount();
    })
    .catch(error => {
      console.log('error: ', error)
    });
  }

  render() {
    return (
      <View style={styles.container} >
        <QuestionInput handleInput={this.handleInput}/>
        <Button
          onPress={this.onButtonPress}
          title="Post"
          color="#000066"
        />
        <Stream questions={this.state.questions} navigation={this.props.navigation}/>
      </View>
    )
  }

  // render() {
  //   return (
  //     <View style={styles.container} >
  //       <Form
  //         ref="qform"
  //         type={Question}
  //         value={{questionInput: this.state.questionInput}}
  //         onChange={this.handleInput}
  //         options={options}
  //       />
  //       <TouchableHighlight style={styles.postButton} onPress={this.onButtonPress}  >
  //         <Text style={styles.postButtonText}>Post</Text>
  //       </TouchableHighlight>
  //       <Stream questions={this.state.questions} navigation={this.props.navigation}/>
  //     </View>
  //   )
  // }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  quesitonInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 20
  },
  postButtonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  postButton: {
    height: 20,
    backgroundColor: '#228B22',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  }
});

// No dispatch methods for App component for now so return empty dispatch.
function bindActions(dispatch) {
  return {
    dispatch
  }
}

const mapStateToProps = state => (state);

export default connect(mapStateToProps, bindActions)(App);