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
import Stream from 'stream';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: ['1', '2']
    }
  }

  render() {
    return (
      <View>
        <Stream questions={this.state.questions} />
      </View>
    )
  }
}

export default App;