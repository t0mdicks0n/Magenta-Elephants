import React from 'react';
import {
  // apis
  Animated,
  AppState,
  AsyncStorage,
  Clipboard,
  Dimensions,
  I18nManager,
  NetInfo,
  PanResponder,
  PixelRatio,
  StyleSheet,
  // components
  ActivityIndicator,
  Button,
  Image,
  ProgressBar,
  ScollView,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableHighlight,
  TouchableWithoutFeedback,
  View
} from 'react-native-web';
import Stream from './Stream.jsx';
import testData from './TestData.js';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: []
    }
  }

  componentWillMount () {
    this.setState({
      questions: testData
    });
  }

  render() {
    
    return (
      <View styles={styles.container} >
        <Text>This is a test</Text>
        <Stream questions={this.state.questions} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  }
});

export default App;