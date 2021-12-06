import React from "react";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { SliderBox } from "react-native-image-slider-box";
import Text from "./Config/Text";
import colors from "./Config/colors";

function List({ title, price, imageUris, onPress, description }) {

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.card}>
        <SliderBox images={imageUris} style={styles.image} dotColor={colors.primary} />
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
    marginBottom: 20,
    overflow: "hidden",
  },
  detailsContainer: {
    padding: 20,
  },
  image: {
    width: "100%",
    height: 200,
  },
  price: {
    color: colors.secondary,
    fontWeight: "bold",
  },
  title:{
    marginBottom: 5,
    fontWeight: "500",
    fontSize: 18
  },
  description: {
    marginBottom: 7,
  },
});

export default List;
