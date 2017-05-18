import React from 'react'
import { Text, View, Button } from 'react-native'
import { connect } from 'react-redux'

class Logout extends React.Component {

  render() {
    this.props.logout();
    return (
        <Text />
    )
  }
}

function bindActions(dispatch) {
  return {
    logout: () => dispatch({type:'LOGOUT'}),
  }
}
const mapStateToProps = state => ({})

export default connect(mapStateToProps, bindActions)(Logout)