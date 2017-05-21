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

var serverURL = 'http://107.170.233.12';

const Form = t.form.Form;

const Person = t.struct({
  email: t.String,
  githubUsername: t.String,
  password: t.String,
  verifyPassword: t.String,
});

// These options are to make the password hidden when you type.
const options = {
  fields: {
    password: {
      password: true,
      secureTextEntry: true
    },
    verifyPassword: {
      password: true,
      secureTextEntry: true
    }
  }
};


class SignUp extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      value: {
        email: '',
        githubusername: '',
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
      // Try to fetch Github profile first.
      const config = {
        headers: {
          'githubusername': this.state.value.githubUsername,
          'email': this.state.value.email
        }
      };
      axios.get(`${serverURL}/github`, config)
      // axios.get('http://localhost:3000/github')
        .then(res => {
          console.log('GitHub profile obtained!', res.status);
          console.log('res.statusCode', res.statusCode);
          if (res.status === 500) {
            throw error;
          } else {
            // Then try to create user in Firebase.
            firebaseApp.auth().createUserWithEmailAndPassword(this.state.value.email, this.state.value.password)
            .then(response => {
              this.props.createUser();
            })
            .catch(error => {
              window.alert('Email address already taken. Please try again with different address.');
            });
          }
        })
        .catch(error => {
          window.alert('Error obtaining GitHub profile. Please check that you have entered the correct Github username. User not created.');
        });



      // firebaseApp.auth().createUserWithEmailAndPassword(this.state.value.email, this.state.value.password)
      // .then(response => {
      //   console.log('User created!');
      //  // Get GitHub profile with the entered GitHub username.
      //   const config = {
      //     headers: {
      //       'githubusername': this.state.value.githubUsername,
      //       'email': this.state.value.email
      //     }
      //   };
      //   axios.get('https://magenta-elephants.herokuapp.com/user', config)
      //   .then(res => {
      //     console.log('GitHub profile obtained!');
      //     this.props.createUser();
      //   })
      //   .catch(error => {
      //     window.alert('Error obtaining GitHub profile.');
      //   });
      // })
      // .catch(error => {
      //   // console.error('Unable to create user.', error.message, error.code);
      //   this.props.relogin();
      //   window.alert('Email address already taken. Please try again with different address.');
      // })
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
        <TouchableHighlight style={styles.signUpButton} onPress={this.createUser} underlayColor='#99d9f4'>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.reLoginButton} onPress={this.props.relogin} underlayColor='#99d9f4'>
          <Text style={styles.buttonText}>I actually signed up already</Text>
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
  signUpButton: {
    height: 36,
    backgroundColor: '#228B22',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  reLoginButton: {
    height: 36,
    backgroundColor: '#F08080',
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
    createUser: () => dispatch({type:'LOGIN', payload: true}),
    relogin: () => dispatch({type: 'SIGNUP', payload: false})
  }
}
const mapStateToProps = state => ({})

export default connect(mapStateToProps, bindActions)(SignUp)