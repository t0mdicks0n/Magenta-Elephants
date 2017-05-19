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
import { connect } from 'react-redux'

const Form = t.form.Form;

const Person = t.struct({
  name: t.String,
  surame: t.maybe(t.String),
  rememberMe: t.Boolean
});

const options = {};


class Login extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      value: {
        name: '',
        surname: ''
      }
    }
    this.onChange = this.onChange.bind(this);
    this.onPress = this.onPress.bind(this);
  }

  onChange(value) {
    this.setState({value});
  }

  onPress() {
    // let value = this.refs.form.getValue();
    // if (value) {
    //   console.log(value);
    // }
    this.props.login();
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
        <TouchableHighlight style={styles.button} onPress={this.onPress} underlayColor='#99d9f4'>
          <Text style={styles.buttonText}>Save</Text>
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
    backgroundColor: '#6495ED',
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
    }
}
const mapStateToProps = state => ({})

export default connect(mapStateToProps, bindActions)(Login)