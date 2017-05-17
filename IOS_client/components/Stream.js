import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet
} from 'react-native';
import Question from './Question.js';

const Stream = (props) => {
  console.log('Stream', props.questions.testData);
  // const _scrollView: ScrollView;
  return (
    <View>
      <ScrollView ref={(scrollView) => { _scrollView = scrollView; }}
        automaticallyAdjustContentInsets={false}
        onScroll={() => { console.log('onScroll!'); }}
        scrollEventThrottle={200}
        style={styles.scrollView}>
        {props.questions.testData.map((question, index) => 
          <Question q={question} key={index} />)}
      </ScrollView>
    </View>
  )
}

var styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#eeeeee',
    height: 300,
  },
  horizontalScrollView: {
    height: 106,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    margin: 5,
  },
  button: {
    margin: 5,
    padding: 5,
    alignItems: 'center',
    backgroundColor: '#cccccc',
    borderRadius: 3,
  },
  thumb: {
    margin: 5,
    padding: 5,
    backgroundColor: '#cccccc',
    borderRadius: 3,
    minWidth: 96,
  },
  img: {
    width: 64,
    height: 64,
  }
});

export default Stream;