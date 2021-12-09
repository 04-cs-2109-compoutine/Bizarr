import React from "react";
import { StyleSheet, View } from "react-native";
import { widthPixel, heightPixel, fontPixel, pixelSizeVertical, pixelSizeHorizontal} from "./Config/responsive"

import colors from "./Config/colors";

function ListItemSeparator() {
  return <View style={styles.separator} />;
}

const styles = StyleSheet.create({
  separator: {
    width: "100%",
    height: heightPixel(1),
    backgroundColor: colors.light,
  },
});

export default ListItemSeparator;
