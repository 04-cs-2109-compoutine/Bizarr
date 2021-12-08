import React, {useEffect, useRef} from 'react';
import {View, StyleSheet, TouchableWithoutFeedback, SafeAreaView, TouchableOpacity, Text, Dimensions} from "react-native";
import { SliderBox } from "react-native-image-slider-box";
import LottieView from 'lottie-react-native';
import colors from "./Config/colors";

const { width, height } = Dimensions.get("window");


const AllHorizontal = ({title, imageUris, price}) => {
  return (
    <View style={styles.detailsContainer}>
     <TouchableWithoutFeedback>
        <View style={styles.card}>
          <SliderBox images={imageUris} style={styles.image}/>
            {/* <Text style={styles.title} numberOfLines={1}>
              {title}
            </Text>
            <Text style={styles.price} numberOfLines={1}>
              {price}
            </Text> */}
          </View>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 15,
    backgroundColor: "green",
    overflow: "hidden",
    margin: 5,
    height: 170,
    width: 170,
    flex: 1,

  },
  detailsContainer: {
    padding: 0,
    borderRadius: 8,
  },
  image: {
    width: "100%",
    height: 200,
    // alignItems: 'center',
    // resizeMode: "contain"
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
