import React, {useState, useEffect} from "react";
import { View, StyleSheet, Modal, Animated, Easing } from "react-native";
// import * as Progress from "react-native-progress";
import LottieView from "lottie-react-native";

function PostedScreen({ onDone, visible = false }) {
  const [progress] = useState(new Animated.Value(0))
  useEffect(() => {
    Animated.timing(progress, {
      toValue: 1,
      duration: 3000
    }).start();
  })
  return (
    <Modal visible={visible}>
      <View style={styles.container}>
        <LottieView
          autoPlay
          loop={false}
          // onAnimationFinish={onDone}
          source={require("../assets/animations/done.json")}
          style={styles.animation}
          progress={progress}
        />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  animation: {
    width: 150,
  },
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
});

export default PostedScreen;
