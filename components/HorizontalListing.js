import React, {useState, useRef, useContext, useEffect}from 'react';
import { StyleSheet, Text ,View, SectionList, SafeAreaView, Image, FlatList, ScrollView } from 'react-native'
import AllHorizontal from './AllHorizontal';

const HorizontalListing = ({listings}) => {


return(
  <View style={styles.container}>
    <ScrollView
    horizontal 

    >
    <FlatList
      data={listings}
      horizontal={true}
      keyExtractor={(item, index) => item.id.toString() }
      renderItem={({ item }) => (
        <AllHorizontal
          title={item.title}
          price={"$" + item.price}
          imageUris={item.images}
        />
      )}
    />
    </ScrollView>
  </View>
)
}

const styles = StyleSheet.create({
  container: {
  
    backgroundColor: 'red',
  },
  sectionHeader: {
    fontWeight: '800',
    fontSize: 16,
    color: 'black',
    marginTop: 20,
    marginLeft: 30,
    marginBottom: 5,
  },
  item: {
    margin: 10,
    paddingRight: 10,
    backgroundColor: 'green',
  },
  itemPhoto: {
    width: 160,
    height: 160,
  },
  itemText: {
    color: 'rgba(255, 255, 255, 0.5)',
    marginTop: 5,
  },
});

export default HorizontalListing;