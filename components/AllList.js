import React from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  SafeAreaView
} from "react-native";

import Text from "./Text";
import colors from "./colors";

function List({ title, subTitle, image, onPress }) {
  return (
    <SafeAreaView style={styles.detailsContainer}>
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.card}>
        <Image style={styles.image} source={image} />
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    flex: 1,
    padding: 0,
    backgroundColor: colors.white,
    // // marginBottom: 4,
    // // padding: 4,
    overflow: "hidden",
  },
  detailsContainer: {
    padding: 0,
    borderRadius: 8,
    flex: 1,
    justifyContent: "flex-start"
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
    flex: 1,
    textAlign: "center"
  },
});

export default List;
