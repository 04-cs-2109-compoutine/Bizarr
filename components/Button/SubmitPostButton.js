import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import defaultStyles from '../Config/styles';
import { widthPixel, heightPixel, fontPixel, pixelSizeVertical, pixelSizeHorizontal} from "../Config/responsive"


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
    padding: pixelSizeVertical(20),
    marginVertical: pixelSizeVertical(10),
  }
})

export default SubmitPostButton;