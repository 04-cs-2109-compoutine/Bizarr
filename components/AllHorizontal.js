import React from 'react';
import {View, StyleSheet, TouchableWithoutFeedback, Dimensions} from "react-native";
import { SliderBox } from "react-native-image-slider-box";

const { width, height } = Dimensions.get("window");

const AllHorizontal = ({imageUris}) => {
  return (
    <View style={styles.detailsContainer}>
     <TouchableWithoutFeedback>
        <View style={styles.card}>
          <SliderBox images={imageUris} style={styles.image}/>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 15,
    overflow: "hidden",
    margin: 5,
    height: 180,
    width: 180,
    flex: 1,
  },
  detailsContainer: {
    padding: 0,
    borderRadius: 8,
    borderWidth: 2,
    margin: 3,
    borderColor: '#79B4B7'
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "contain"
  },
});

export default AllHorizontal;
