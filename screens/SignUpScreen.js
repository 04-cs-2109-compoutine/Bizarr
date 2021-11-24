import React from "react";
import { ImageBackground, StyleSheet } from "react-native";

function SignUpScreen(props) {
  return <ImageBackground style={styles.background}></ImageBackground>;
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "green",
  },
});
export default SignUpScreen;
