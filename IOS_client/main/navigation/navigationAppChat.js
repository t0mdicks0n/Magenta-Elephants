import { StackNavigator } from 'react-navigation'
import App from '../components/App.js'
import Chat from '../components/Chat.js'

const AppChatNavigator = StackNavigator({
    Home: { screen: App },
    Chat: { screen: Chat },
  }, {
    initialRouteName: 'Home'
});


export default AppChatNavigator