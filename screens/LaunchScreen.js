import { StyleSheet, Text, View, Image, Dimensions} from "react-native";
import RaisedButton from "../components/Button/launchButton";
import React, { useState, useEffect } from 'react';
const mapGif = require('../assets/image/transpmap2.gif')
const {width, height} = Dimensions.get('window')
import { widthPixel, heightPixel, fontPixel, pixelSizeVertical, pixelSizeHorizontal} from "../components/Config/responsive"


const LaunchScreen = ({ navigation }) => {

  return (
      <View style={styles.container}>
        <View style={{...StyleSheet.absoluteFill}}>
         <Image
          source={mapGif}
          style={{flex: 1, height: null, width: null, borderBottomLeftRadius: 30,
            borderBottomRightRadius: 15,
            overflow: 'hidden',}}
        />
        </View>
        <View>
        <Image
          style={styles.logo}
          source={require("../assets/B.png")}
          style={{flex: 1,
            height: heightPixel(300), width: widthPixel(300), position: 'absolute', top: pixelSizeVertical(-450),
            right: pixelSizeHorizontal(60),
          }}
        />
        </View>
        <View style={{height: heightPixel(height / 4), backgroundColor: "#F4F9F4",  borderTopLeftRadius: 65,  borderTopRightRadius: 65}}>
          <View>
          <RaisedButton
            text="Sign up"
            onPress={() => navigation.navigate("Sign up")}
          />
          </View>
          <View>
          <Text style={styles.text} onPress={() => navigation.navigate("Login")}>
          {"Login"}
          </Text>
          </View>
        </View>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    justifyContent: "flex-end",
    backgroundColor: "#5C8D89"
  },
  imageContainer: {
    flex: 1,
    left: pixelSizeHorizontal(20),
  },
  image: {
    flex: 1,
    width: "100%",
    height: "100%"
  },
  logo: {
    width: widthPixel(300),
    height: heightPixel(300),
  },
  button:{
    backgroundColor: 'white',
    height: heightPixel(70),
    marginHorizontal: pixelSizeHorizontal(20),
    borderRadius: 35,
    alignItems: 'center',
    marginVertical: pixelSizeVertical(5),
    justifyContent: 'center'
  },
  text: {
    color: "black",
    fontSize: fontPixel(20),
    lineHeight: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: pixelSizeVertical(20),
  },
});

export default LaunchScreen;
