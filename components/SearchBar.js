import React, {useState} from 'react';
import {View, TextInput, StyleSheet, KeyboardAvoidingView} from 'react-native';
import colors from './Config/colors';
import { widthPixel, heightPixel, fontPixel, pixelSizeVertical, pixelSizeHorizontal} from "./Config/responsive"


const Searchbar = ({ value }) => {

  const [query, setQuery] = useState(value);

  return (
    <KeyboardAvoidingView>
      <View style={styles.container}>
        <TextInput 
          style={styles.textInput} 
          onChangeText={(text) => {setQuery(text)}}
        />
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({

  textInput:{
    width: '100%',
    height: "100%",
    fontSize: fontPixel(18),
    marginLeft: pixelSizeHorizontal(5),
    alignItems: 'center'

  },
  container:{
    width: '100%',
    height: heightPixel(40),
    backgroundColor: '#FEFBF3',
    borderRadius: 7,
    borderWidth: 2,
    paddingBottom: pixelSizeVertical(5),
    borderColor: '#79B4B7'
  },

})

export default Searchbar;