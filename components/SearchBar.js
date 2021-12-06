//
import React, {useState} from 'react';
import {View, TextInput, StyleSheet, Image, KeyboardAvoidingView} from 'react-native';
// import {} from 'react-native-vector-icons'

const Searchbar = ({ value, onChangeText, style }) => {

  const [query, setQuery] = useState(value);
  // const [error, setError] = useState()

  return (
    <KeyboardAvoidingView>
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <View style={styles.vwSearch}>
        {/* <Image source={require('../assets/baseline_search_black_24dp.png')}
        resizeMode='center'
        style={styles.icSearch}
        /> */}
             <TextInput style={styles.textInput} onChangeText={(text) => {setQuery(text)}}
        />
        </View>
   
        {/* <View style={styles.vwClear}></View> */}
        </View>
      </View >
      </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  vwClear:{flex: 0.2},
  vwSearch:{
    flex: 0.2,
    // width: 40,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textInput:{
    // flex: 1,
    // backgroundColor: "red",
    // justifyContent: 'center',
    // alignItems: 'center',
    // width: 300,
    width: '100%',
    height: 40,
    flexDirection: 'row',
    // paddingLeft: 300 
  },
  icSearch:{
    height: 44, width: 44
  },
  searchContainer:{
    backgroundColor: "#f4f9f4",
    width: '90%',
    height: 40,
    flexDirection: 'row',
    // backgroundColor: "blue"
    // paddingBottom: 200
  },
container:{
  width: '70%',
  height: 60,
  flexDirection: 'row',
  marginLeft: 30,
  // marginBottom: 35,
  backgroundColor: "#f4f9f4",
  borderRadius: 7,
  borderWidth: 1,
  // borderColor: "#5C8D89",
  // borderStyle: "solid",
  paddingBottom: 5
},
searchInput:{
  width: 100,
  height: 100,
  paddingLeft: 25,
  paddingRight: 75,
  // paddingBottom: -100,
  fontSize: 16,
  backgroundColor: "black"

}


})

export default Searchbar;