import React from "react";
import { View, StyleSheet, Modal } from "react-native";
// import * as Progress from "react-native-progress";
import LottieView from "lottie-react-native";
import colors from "../components/Config/colors";

function PostedScreen({ onDone, visible = false }) {
  return (
    <Modal visible={visible}>
      <View style={styles.container}>
        <LottieView
          autoPlay
          loop={false}
          onAnimationFinish={onDone}
          source={require("../assets/animations/done.json")}
          style={styles.animation}
          duration={1000}
        />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  animation: {
    width: 150,
    color: colors.primary,
  },
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
});

export default PostedScreen;
