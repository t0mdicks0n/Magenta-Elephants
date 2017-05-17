import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import Currency from './Currency.js';

const Question = (props) => {
  if (props.q.avatar) {
    return (
      <View style={styles.questionBox}>
        <Image 
          source={{uri: props.q.avatar}} 
          style={styles.image}/>
        <Text style={styles.textArea}>{props.q.questionTitle}</Text>
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

const styles = StyleSheet.create({
  questionBox: {
    width: 350,
    height: 120,
    paddingTop: 5,
    paddingBottom: 5,
    paddingRight: 5,
    paddingLeft: 5,
    marginBottom: 10,
    marginRight: 10,
    backgroundColor: '#C0C0C0',
    borderColor: 'black',
    borderWidth: 1,
    alignItems: 'flex-start',
    flexDirection: 'row'
  },
  image: {
    width: 80,
    height: 110
  },
  textArea: {
    paddingLeft: 5,
    paddingRight: 5,
    flex: 1,
    flexWrap: 'wrap'
  }
});

export default Question;