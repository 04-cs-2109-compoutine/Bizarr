import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import defaultStyles from '../styles';

function SubmitPostButton({ onPress, text }) {
  return (
    <TouchableOpacity 
      style={styles.inputContainer}
      onPress={{ onPress }}>
      <Text style={defaultStyles.text}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  inputContainer:{
    backgroundColor: defaultStyles.colors.light,
    borderRadius: 25,
    flexDirection: "row",
    width: "100%",
    padding: 20,
    marginVertical: 10,
  }
})

export default SubmitPostButton;