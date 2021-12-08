import React from 'react';
import {View, StyleSheet, TouchableWithoutFeedback, SafeAreaView, TouchableOpacity} from "react-native";
import { SliderBox } from "react-native-image-slider-box";
import colors from "./Config/colors";

function AllHorizontal({imageUris, onRowPress}) {

  return (
    <SafeAreaView style={styles.detailsContainer}>
     <TouchableOpacity onPress={onRowPress}>
        <View style={styles.card}>
          <SliderBox 
            images={imageUris} 
            style={styles.image}
            onCurrentImagePressed={onRowPress}
          />
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 15,
    backgroundColor: colors.white,
    overflow: "hidden",
    margin: 5,
  },
  detailsContainer: {
    padding: 0,
    borderRadius: 8,
    flex: 2,
  },
  image: {
    width: "45%",
    height: 200,
    alignItems: 'center'
  },
  price: {
    color: colors.secondary,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: -10,
    marginBottom: 5
  },
  title: {
    flex: 2,
    textAlign: "center",
    marginLeft: -5
  },
  heartLottie: {
    flex: 1,
    width: 50,
    height: 50,
    marginLeft: -2
  },
  likeContainer:{
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    width: "80%",
  }
});

export default AllHorizontal;
