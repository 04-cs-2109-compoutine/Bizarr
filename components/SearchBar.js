import React, {useState} from 'react';
import {View, TextInput, StyleSheet, KeyboardAvoidingView} from 'react-native';
import colors from './Config/colors';

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
    fontSize: 18,
    marginLeft: 5,
    alignItems: 'center'

  },
  container:{
    width: '100%',
    height: 40,
    backgroundColor: '#FEFBF3',
    borderRadius: 7,
    borderWidth: 2,
    paddingBottom: 5,
    borderColor: '#79B4B7'
  },

})

export default Searchbar;