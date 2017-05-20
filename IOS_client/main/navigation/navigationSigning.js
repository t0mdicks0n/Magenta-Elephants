import { StackNavigator } from 'react-navigation';
// import SignUp from '../components/SignUp.js';
import SignUp from './screen/screenSignUp';

const SigningNavigator = StackNavigator({
  SignUp: { screen: SignUp },
}, {
  initialRouteName: 'SignUp'
})

export default SigningNavigator;