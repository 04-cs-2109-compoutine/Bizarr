
import { StyleSheet, Text, View, Image, SafeAreaView, Dimensions} from "react-native";
import { Button } from "react-native-elements";
import RaisedButton from "../components/Button/launchButton";
import Login from "./LoginScreen";
import Screen from "../components/Screen";
import React, { useState, useEffect } from 'react';
const mapGif = require('../assets/image/transpmap2.gif')
const {width, height} = Dimensions.get('window')


const LaunchScreen = ({ navigation }) => {
  [isReady, setIsReady] = useState(false)
  useEffect( () => {
    console.log(isReady);
}, [isReady]);

  return (
      <View style={styles.container}>
        <View style={{...StyleSheet.absoluteFill}}>
         <Image
          source={mapGif}
          // resizeMode="cover"
          style={{flex: 1, height: null, width: null, borderBottomLeftRadius: 30,
            borderBottomRightRadius: 15,
            // borderTopRightRadius: 30,
            // borderTopLeftRadius: 15,
            overflow: 'hidden',}}
        /> 
        </View>
        <View>
        <Image
          style={styles.logo}
          source={require("../assets/B.png")}
          style={{flex: 1,
            height: 300, width: 300, position: 'absolute', top: -450,
            right: 60,
          }}
        />
        </View>
        <View style={{height: height / 4, backgroundColor: "#F4F9F4",  borderTopLeftRadius: 65,  borderTopRightRadius: 65}}>
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
  // buttonsContainer: {
  //   // padding: 20,
  //   // width: width / 3,
  //   height: height / 3,
  //   backgroundColor: 'white'
  // },
  button:{
    backgroundColor: 'white',
    height: 70,
    marginHorizontal: 20,
    borderRadius: 35,
    alignItems: 'center',
    marginVertical: 5,
    justifyContent: 'center'
  },
  text: {
    color: "black",
    fontSize: 20,
    lineHeight: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
  },
});

export default LaunchScreen;
