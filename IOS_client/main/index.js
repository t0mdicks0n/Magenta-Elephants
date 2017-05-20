import React, { Component } from 'react'
import { Provider } from 'react-redux'
import Navigator from './navigation'
import { createStore } from 'redux'


function loginReducer(state = { login: true, signUp: false }, action) {
  switch (action.type) {
    case 'LOGIN': return true
    case 'SIGNUP': return false
    case 'LOGOUT': return false
    default: return state
  }
}
const store = createStore(loginReducer);

export default class Root extends Component {
  constructor() {
    super()
    this.state = { store }
  }
  render() {
    return (
      <Provider store={this.state.store}>
        <Navigator />
      </Provider>
    )
  }
}