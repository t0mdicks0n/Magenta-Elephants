import React from 'react';
import {
  View
} from 'react-native';
import Question from './Question.js';

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