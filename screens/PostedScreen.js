import React, {useState, useEffect} from "react";
import { View, StyleSheet, Modal, Animated, Easing } from "react-native";
// import * as Progress from "react-native-progress";
import LottieView from "lottie-react-native";

function PostedScreen({ onDone, visible = false, navigation }) {
  const [progress] = useState(new Animated.Value(0))
  useEffect(() => {
    Animated.timing(progress, {
      toValue: 1,
      duration: 3000,
      easing: Easing.linear,
      useNativeDriver: true
    }).start()
    onDone();
  })

  // setTimeout(() => {
  //   onDone();
  //   navigation.navigate("My Listings");
  // }, 3000);

  return (
    <Modal visible={visible}>
      <View style={styles.container}>
        <LottieView
          autoPlay
          loop={false}
          progress={progress}
          // onAnimationFinish={onDone}
          source={require("../assets/animations/done.json")}
          style={styles.animation}
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
