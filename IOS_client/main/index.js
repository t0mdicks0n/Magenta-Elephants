import React, { Component } from 'react'
import { Provider } from 'react-redux'
import Navigator from './navigation'
import { applyMiddleware, createStore } from 'redux'


function loginReducer(state, action) {
  console.log('initial state', state);
  switch (action.type) {
    case 'LOGIN': return {...state, login: action.payload, userInfo: action.userInfo}
    case 'SIGNUP': return {...state, login: false, signUp: action.payload}
    case 'LOGOUT': return {...state, login: false, signUp: false}
    default: return state
  }
}


const middleware = applyMiddleware(logger);

const logger = (store) => (next) => (action) =>  {
  console.log('action fired', action);
  next(action);
};


const store = createStore(loginReducer, {
  login: false
});

store.subscribe(()=> {
  console.log('store changed', store.getState());
});

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