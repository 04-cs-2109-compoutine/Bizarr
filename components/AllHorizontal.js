import React, {useEffect, useRef} from 'react';
import {View, StyleSheet, TouchableWithoutFeedback, SafeAreaView, TouchableOpacity, Text} from "react-native";
import { SliderBox } from "react-native-image-slider-box";
import LottieView from 'lottie-react-native';
import colors from "./Config/colors";

const AllHorizontal = ({title, imageUris, price}) => {
  return (
    <SafeAreaView style={styles.detailsContainer}>
     <TouchableWithoutFeedback>
        <View style={styles.card}>
          <SliderBox images={imageUris} style={styles.image}/>
            <Text style={styles.title} numberOfLines={1}>
              {title}
            </Text>
            <Text style={styles.price} numberOfLines={1}>
              {price}
            </Text>
          </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 15,
    backgroundColor: "green",
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
});

export default AllHorizontal;
