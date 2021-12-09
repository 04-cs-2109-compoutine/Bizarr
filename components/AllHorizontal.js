import React from 'react';
import {View, StyleSheet, TouchableWithoutFeedback, SafeAreaView, TouchableOpacity} from "react-native";
import { SliderBox } from "react-native-image-slider-box";
import colors from "./Config/colors";
import { widthPixel, heightPixel, fontPixel, pixelSizeVertical, pixelSizeHorizontal} from "./Config/responsive"


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
    margin: pixelSizeVertical(5),
  },
  detailsContainer: {
    padding: 0,
    borderRadius: 8,
    flex: 2,
  },
  image: {
    width: "45%",
    height: heightPixel(200),
    alignItems: 'center'
  },
  price: {
    color: colors.secondary,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: pixelSizeVertical(-10),
    marginBottom: pixelSizeVertical(5)
  },
  title: {
    flex: 2,
    textAlign: "center",
    marginLeft: pixelSizeHorizontal(-5)
  },
  heartLottie: {
    flex: 1,
    width: widthPixel(50),
    height: heightPixel(50),
    marginLeft: pixelSizeHorizontal(-2)
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
