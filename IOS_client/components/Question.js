import React from 'react';
import {
  View,
  Image,
  Text
} from 'react-native';
import Currency from './Currency.js';

const Question = (props) => {
  if (props.q.avatar) {
    return (
      <View>
        <Image 
          source={{uri: props.q.avatar}} 
          style={{width: 193, height: 110}}/>
        <Text>{props.q.questionTitle}</Text>
        <Currency />
      </View>
    )
  } else {
    return (
      <View>
        <Text>{props.q.questionTitle}</Text>
        <Currency />
      </View>
    )
  }
}

export default Question;