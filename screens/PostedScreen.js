import React, {useState, useEffect} from "react";
import { View, StyleSheet, Modal, Animated, Easing } from "react-native";
// import * as Progress from "react-native-progress";
import LottieView from "lottie-react-native";
import { widthPixel, heightPixel, fontPixel, pixelSizeVertical, pixelSizeHorizontal} from "../components/Config/responsive"


function PostedScreen({ onDone, visible = false, navigation }) {

  return (
    <Modal visible={visible}>
      <View style={styles.container}>
        <LottieView
          autoPlay
          loop={false}
          onAnimationFinish={onDone}
          source={require("../assets/animations/done.json")}
          style={styles.animation}
        />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  animation: {
    width: widthPixel(150),
  },
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
});

export default PostedScreen;
