import { StackNavigator } from 'react-navigation'

// import Register from './screenRegister'
import Login from './screen/screenLogin'
// import PwdForget from './screenPwdforget'
// import Tour from './screenTour'

const OnboardingNavigator = StackNavigator({
    Login: { screen: Login }
    // Register: { screen: Register },
    // PwdForgot: { screen: PwdForgot },
}, {
    initialRouteName: 'Login'
})

export default OnboardingNavigator