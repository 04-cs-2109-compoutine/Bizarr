import React from "react";
import {View, StyleSheet, TouchableWithoutFeedback, SafeAreaView} from "react-native";
import { SliderBox } from "react-native-image-slider-box";
import Text from "./Config/Text";
import colors from "./Config/colors";

function List({ title, price, imageUris, onPress }) {
  return (
    <SafeAreaView style={styles.detailsContainer}>
      <TouchableWithoutFeedback onPress={onPress}>
        <View style={styles.card}>
          <SliderBox images={imageUris} style={styles.image}/>
          <View style={styles.detailsContainer}>
            <Text style={styles.title} numberOfLines={1}>
              {title}
            </Text>
            <Text style={styles.price} numberOfLines={2}>
              {price}
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 15,
    backgroundColor: colors.white,
    overflow: "hidden",
    margin: 5
  },
  detailsContainer: {
    padding: 0,
    borderRadius: 8,
    flex: 1,
    justifyContent: "flex-start",
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
  },
  title: {
    flex: 1,
    textAlign: "center",
  },
});

export default List;
