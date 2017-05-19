import { StackNavigator } from 'react-navigation'

// import Register from './screenRegister'
// import Login from './screen/screenLogin'
import Login from '../components/Login.js'
// import PwdForget from './screenPwdforget'
// import Tour from './screenTour'

const OnboardingNavigator = StackNavigator({
    Login: { screen: Login }
  }, {
    initialRouteName: 'Login'
})

export default OnboardingNavigator;