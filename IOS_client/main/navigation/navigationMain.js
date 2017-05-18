import { DrawerNavigator } from 'react-navigation'
import Overview from './screen/screenOverview'
// import Settings from './screenSettings'
import Logout from './screen/screenLogout'

const MainNavigator = DrawerNavigator({
    Forum: { screen: Overview },
    Settings: { screen: Overview },
    Logout: { screen: Logout },
}, {
    initialRouteName: 'Forum'
})

export default MainNavigator