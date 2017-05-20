import React, { Component } from 'react'
import { connect } from 'react-redux'
import OnboardingNavigator from './navigationOnboarding'
import MainNavigator from './navigationMain'
import SigningUpNavigator from './navigationSigning'

class Navigator extends Component {
  render() {

    console.log('GIVE ME THE PROPS', this.props);
    if (this.props.login) {
      return <MainNavigator/>
    }
    // else if (this.props.signUp) {
    //   // return <SigningUpNavigator/>
    // }
    else {
      return <OnboardingNavigator/>
    }
    {/*return this.props.login ? <MainNavigator/> : <OnboardingNavigator/>*/}
  }
}

const mapStateToProps = state => ({ login: state, signUp: state })

export default connect(mapStateToProps, {})(Navigator)