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

const Form = t.form.Form;

const Person = t.struct({
  email: t.String,
  githubUsername: t.String,
  password: t.String,
  verifyPassword: t.String,
});

const options = {};


class SignUp extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      value: {
        email: '',
        password: '',
        verifyPassword: ''
      }
    }
    this.onChange = this.onChange.bind(this);
    this.createUser = this.createUser.bind(this);
  }

  onChange(value) {
    this.setState({value});
  }

  createUser() {
    let value = this.refs.form.getValue();
    if (value && value.password === value.verifyPassword) {
      firebaseApp.auth().createUserWithEmailAndPassword(this.state.value.email, this.state.value.password)
      .then(response => {
        console.log('User created!');
      })
      .catch(error => {
        console.error('Unable to create user.', error.message, error.code);
      })
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
        <TouchableHighlight style={styles.button} onPress={this.createUser} underlayColor='#99d9f4'>
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
  button: {
    height: 36,
    backgroundColor: '#228B22',
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
        createUser: () => dispatch({type:'CREATEUSER'}),
    }
}
const mapStateToProps = state => ({})

export default connect(mapStateToProps, bindActions)(Login)