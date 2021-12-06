//
import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';

const Searchbar = ({ value, onChangeText, style }) => {

  // const [query, setQuery] = useState(value);
  // const [error, setError] = useState()

  return (
      <View style={styles.container}>
        <TextInput placeholder='Search here...'
        />
      </View >
  )
}

const styles = StyleSheet.create({
container:{
  width: '60%',
  height: 60,
  flexDirection: 'row',
  marginLeft: 35,
  // marginBottom: 35,
  backgroundColor: "#f4f9f4",
  borderRadius: 7,
  borderWidth: 1,
  borderColor: "#5C8D89",
  borderStyle: "solid"
  
},
searchInput:{
  width: '100%',
  height: '100%',
  paddingLeft: 25,
  fontSize: 20

}


})

export default Searchbar;