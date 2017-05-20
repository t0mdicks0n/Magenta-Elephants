import React from 'react'
import { Text, View, Button, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import AppChatNavigator from '../navigationAppChat'

class Overview extends React.Component {
  static navigationOptions = {
    drawer: () => ({
      label: 'My Overview',
      logout: () => dispatch({type:'LOGOUT'}),
    })
  };
  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.mainContainer}>
        <AppChatNavigator style={styles.contentContainer}/>
        <View style={styles.footerContainer}>
          <Button onPress={() => navigate('DrawerOpen')} title="Menu" />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    height: 24
  },
  footerContainer: {
    flex: 0.5,
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems:"center",
    paddingRight: 5
  },
  contentContainer: {
    flex: 7,
  },
});

function bindActions(dispatch) {
  return {
    dispatch,
  }
}

const mapStateToProps = state => ({})

export default connect(mapStateToProps, bindActions)(Overview)