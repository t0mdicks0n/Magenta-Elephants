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
                <View style={styles.headerContainer}>
                    <Button onPress={() => navigate('DrawerOpen')} title="Menu" />
                </View>
                <AppChatNavigator style={styles.contentContainer}/>
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
 headerContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#68f5f9",
    alignItems:"center",
    paddingRight: 5
 },
 contentContainer: {
    flex: 6,
 },
});

function bindActions(dispatch) {
    return {
        dispatch,
    }
}

const mapStateToProps = state => ({})

export default connect(mapStateToProps, bindActions)(Overview)