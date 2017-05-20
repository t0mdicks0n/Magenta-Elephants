import React from 'react'
import { Text, View, Button } from 'react-native'
import { connect } from 'react-redux'

class SignUp extends React.Component {
    render() {
        return (
            <View>
                <Text>Name, Password</Text>
                <Button onPress={() => this.props.signUp()} title="SignUp" />
            </View>
        )
    }
}

function bindActions(dispatch) {
    return {
        signUp: () => dispatch({type:'SIGNUP'}),
    }
}
const mapStateToProps = state => ({})

export default connect(mapStateToProps, bindActions)(SignUp)