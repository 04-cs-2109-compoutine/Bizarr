import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import colors from "../Config/colors";
import { widthPixel, heightPixel, fontPixel, pixelSizeVertical, pixelSizeHorizontal} from "../Config/responsive"

function SubmitButton({ title, onPress, color = "primary" }) {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: colors[color] }]}
      onPress={onPress}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    padding: pixelSizeVertical(10),
    width: "35%",
    marginVertical: pixelSizeVertical(10),
  },
  text: {
    color: colors.white,
    fontSize: fontPixel(18),
    textTransform: "uppercase",
    fontWeight: "bold",
  },
});

export default SubmitButton;
