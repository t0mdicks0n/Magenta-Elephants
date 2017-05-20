import { StackNavigator } from 'react-navigation';

// import Register from './screenRegister'
import Login from './screen/screenLogin';
// import Login from '../components/Login.js';
// import PwdForget from './screenPwdforget'
// import Tour from './screenTour'
import SignUp from './screen/screenSignUp';


const OnboardingNavigator = StackNavigator({
    Login: { screen: Login },
    SignUp: { screen: SignUp },
    // PwdForgot: { screen: PwdForgot },
}, {
    initialRouteName: 'Login'
    // initialRouteName: 'SignUp'
})

export default OnboardingNavigator;