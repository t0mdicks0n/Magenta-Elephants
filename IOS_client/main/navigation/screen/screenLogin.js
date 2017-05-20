'use strict';
import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} from 'react-native';
import t from 'tcomb-form-native';
import { connect } from 'react-redux';
import { firebaseApp } from './config/config.js';
import axios from 'axios';

const Form = t.form.Form;

const Person = t.struct({
  email: t.String,
  // githubUsername: t.String,
  password: t.String,
  rememberMe: t.Boolean
});

const options = {};


class Login extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      value: {
        email: '',
        // githubUsername: '',
        password: ''
      }
    }
    this.onChange = this.onChange.bind(this);
    this.login = this.login.bind(this);
  }

  onChange(value) {
    this.setState({value});
  }

  login() {
    let value = this.refs.form.getValue();
    if (value) {
      firebaseApp.auth().signInWithEmailAndPassword(this.state.value.email, this.state.value.password)
      .then(response => {
        console.log('User authenticated!');
        const config = {
          headers: {
            'email': this.state.value.email
          }
        };
        axios.get('http://localhost:3000/user', config)
        .then(response => {
          console.log('User info retrieved!', response.data);
        })
      })
      .catch(error => {
        console.error('Unable to authenticate.', error.message, error.code);
      });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Form
          ref="form"
          type={Person}
          value={this.state.value}
          onChange={this.onChange}
          options={options}
        />
        <TouchableHighlight style={styles.loginButton} onPress={this.props.login} underlayColor='#99d9f4'>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.signUpButton} onPress={this.props.signUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableHighlight>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: 50,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 30,
    alignSelf: 'center',
    marginBottom: 30
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  loginButton: {
    height: 36,
    backgroundColor: '#6495ED',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  signUpButton: {
    height: 36,
    backgroundColor: '#32CD32',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  }
});

function bindActions(dispatch) {
  return {
    login: () => dispatch({type:'LOGIN'}),
    signUp: () => dispatch({type: 'SIGNUP'})
  }
};

const mapStateToProps = state => ({})

export default connect(mapStateToProps, bindActions)(Login)