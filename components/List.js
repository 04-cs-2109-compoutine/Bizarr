import React from "react";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { SliderBox } from "react-native-image-slider-box";
import Text from "./Config/Text";
import colors from "./Config/colors";
import { widthPixel, heightPixel, fontPixel, pixelSizeVertical, pixelSizeHorizontal} from "./Config/responsive"


function List({ title, price, imageUris, onPress, description }) {

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.card}>
        <SliderBox 
          images={imageUris} 
          style={styles.image} 
          dotColor={colors.primary} 
          onCurrentImagePressed={onPress}
        />
        <View style={styles.detailsContainer}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
          <Text style={styles.description} numberOfLines={3}>
            {description}
          </Text>
          <Text style={styles.price} numberOfLines={2}>
            {price}
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 15,
    backgroundColor: colors.white,
    marginBottom: pixelSizeVertical(20),
    overflow: "hidden",
  },
  detailsContainer: {
    padding: pixelSizeVertical(20),
  },
  image: {
    width: "100%",
    height: heightPixel(200),
  },
  price: {
    color: colors.secondary,
    fontWeight: "bold",
  },
  title:{
    marginBottom: pixelSizeVertical(5),
    fontWeight: "500",
    fontSize: fontPixel(18)
  },
  description: {
    marginBottom: pixelSizeVertical(7),
  },
});

export default List;
