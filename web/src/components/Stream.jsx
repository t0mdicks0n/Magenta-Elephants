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
import Question from './Question.jsx';


const Stream = (props) => {
  console.log('Stream', props.questions.testData);
  return (
    <View>
      {props.questions.testData.map((question, index) => 
        <Question q={question} key={index} />)}
    </View>
  )
}

export default Stream;