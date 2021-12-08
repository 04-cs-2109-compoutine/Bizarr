//
import React, {useState} from 'react';
import {View, TextInput, StyleSheet, Image, KeyboardAvoidingView} from 'react-native';
// import {} from 'react-native-vector-icons'

const Searchbar = ({ value, onChangeText }) => {

  const [query, setQuery] = useState(value);
  // const [error, setError] = useState()

  return (
    <KeyboardAvoidingView>
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <View style={styles.vwSearch}>
            <TextInput style={styles.textInput} onChangeText={(text) => {setQuery(text)}}
            />
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  vwClear:{flex: 0.2},
  vwSearch:{
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textInput:{

    width: '100%',
    height: 40,

  },
  icSearch:{
    height: 44, width: 44
  },
  searchContainer:{
    backgroundColor: "#f4f9f4",
    width: '90%',
    height: 40,
    flexDirection: 'row',

  },
container:{
  width: '70%',
  height: 60,
  flexDirection: 'row',
  marginLeft: 30,

  backgroundColor: "#f4f9f4",
  borderRadius: 7,
  borderWidth: 1,

  paddingBottom: 5
},
searchInput:{
  width: 100,
  height: 100,
  paddingLeft: 25,
  paddingRight: 75,

  fontSize: 16,
  backgroundColor: "black"

}


})

export default Searchbar;