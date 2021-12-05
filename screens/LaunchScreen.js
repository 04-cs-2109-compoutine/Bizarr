
import { StyleSheet, Text, View, Image, SafeAreaView} from "react-native";
import { Button } from "react-native-elements";
import RaisedButton from "../components/Button/launchButton";
import Login from "./LoginScreen";
import Screen from "../components/Screen";
import React, { useState, useEffect } from 'react';
const mapGif = require('../assets/image/transpmap2.gif')


const LaunchScreen = ({ navigation }) => {
  [isReady, setIsReady] = useState(false)
  useEffect( () => {
    console.log(isReady);
}, [isReady]);

  return (
      <View style={styles.container}>
        {/* <Image
          style={styles.logo}
          source={require("../assets/image/logotransparent.png")}
        /> */}
         <Image
          source={mapGif}
          // resizeMode="cover"
          style={styles.image}
        /> 
        {/* <FastImage
    style={styles.image}
    source={{
      uri: mapGif,
      headers: { Authorization: 'token' },
      priority: FastImage.priority.normal,
      cache: FastImage.cacheControl.immutable,
    }}
    resizeMode={FastImage.resizeMode.contain}
/> */}
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#5C8D89"
  },
  imageContainer: {
    flex: 1,
    left: 20,
  },
  image: {
    flex: 1,
    // justifyContent: "center",
    // resizeMode: "stretch",
    width: "100%",
    height: "100%"
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
