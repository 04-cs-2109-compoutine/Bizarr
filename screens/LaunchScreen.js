import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { Button } from "react-native-elements";
import RaisedButton from "../components/Button/launchButton";
import Login from "./LoginScreen";
import Screen from "../components/Screen";
import routes from "../components/routes";

const LaunchScreen = ({ navigation }) => {
  return (
    <Screen>
      <View style={styles.container}>
        <Image
          style={styles.logo}
          source={require("../assets/image/logotransparent.png")}
        />
        <View style={styles.buttonsContainer}>
          <RaisedButton
            text="Login"
            onPress={() => navigation.navigate("Login")}
          />
          <RaisedButton
            text="Sign up"
            onPress={() => navigation.navigate("Sign up")}
          />
        </View>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    flex: 1,
    justifyContent: "center",
    resizeMode: "stretch",
  },
  logo: {
    width: 300,
    height: 300,
  },
  buttonsContainer: {
    padding: 20,
    width: "60%",
  },
  text: {
    color: "black",
    fontSize: 16,
    lineHeight: 32,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "white",
  },
});

export default LaunchScreen;
