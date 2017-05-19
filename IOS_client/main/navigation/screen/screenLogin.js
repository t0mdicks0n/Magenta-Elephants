import React from 'react'
import { Text, View, Button } from 'react-native'
import { connect } from 'react-redux'

class Login extends React.Component {
  render() {
    return (
      <View>
        <Text>Name, Password</Text>
        <Button onPress={() => this.props.login()} title="Login" />
      </View>
    )
  }
}

function bindActions(dispatch) {
  return {
    login: () => dispatch({type:'LOGIN'}),
  }
}
const mapStateToProps = state => ({})

export default connect(mapStateToProps, bindActions)(Login)