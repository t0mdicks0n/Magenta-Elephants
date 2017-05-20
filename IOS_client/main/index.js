import React, { Component } from 'react'
import { Provider } from 'react-redux'
import Navigator from './navigation'
import { createStore } from 'redux'


function loginReducer(state, action) {
  switch (action.type) {
    case 'LOGIN': return Object.assign({}, {login: action.payload})
    case 'SIGNUP': return Object.assign({}, {signUp: action.payload})
    case 'LOGOUT': return false
    default: return state
  }
}
const store = createStore(loginReducer, false);

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