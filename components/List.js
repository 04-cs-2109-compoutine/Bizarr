import React, {useState} from "react";
import { View, StyleSheet, Image, TouchableWithoutFeedback } from "react-native";
import { SliderBox } from "react-native-image-slider-box";
import Text from "./Config/Text";
import colors from "./Config/colors";

function List({ title, subTitle, imageUris, onPress }) {

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.card}>
        <SliderBox images={imageUris}/>
        <View style={styles.detailsContainer}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
          <Text style={styles.subTitle} numberOfLines={2}>
            {subTitle}
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
  subTitle: {
    color: colors.secondary,
    fontWeight: "bold",
  },
  title: {
    marginBottom: 7,
  },
});

export default List;
