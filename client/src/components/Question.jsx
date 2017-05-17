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
import Currency from './Currency.js';

const Question = (props) => {
  let pic = {
    uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'
  };
  console.log('Question', props);
  return (
    <View>
      <Image source={props.q.avatar} style={{width: 193, height: 110}}/>
      <Text>{props.q.questionTitle}</Text>
      <Currency />
    </View>
  )
}

export default Question;