import React, { useState } from "react";
import Axios from "axios";
import { View, StyleSheet, Modal, Pressable, Text } from "react-native";
import Constants from "expo-constants";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

if (process.env.NODE_ENV !== "production") require("../secrets");
const GOOGLE_PLACES_API_KEY = process.env.GOOGLE_PLACES_API_KEY;

//auto complete with geo coding info
const App = () => {
  const [location, setLocation] = useState({
    latitude: 40.752714,
    longitude: -73.97722689999999,
    description: "Grand central station, East 42nd Street, New York, NY, USA",
  });
  const [pin, setPin] = useState({});

  return (
    <View style={styles.modalView}>
      <View
        style={{
          backgroundColor: "#E4EFE7",
          paddingHorizontal: 18,
          paddingVertical: 12,
          borderRadius: 20,
        }}
      >
        <GooglePlacesAutocomplete
          placeholder="Search"
          query={{
            key: GOOGLE_PLACES_API_KEY,
            language: "en", // language of the results
          }}
          onPress={async (data, details = null) => {
            const { data: res } = await Axios.get(
              `https://maps.googleapis.com/maps/api/place/details/json?input=bar&placeid=${data.place_id}&key=${GOOGLE_PLACES_API_KEY}`
            );
            setLocation({
              latitude: res.result.geometry.location.lat,
              longitude: res.result.geometry.location.lng,
              description: data.description,
            });
          }}
          onFail={(error) => console.error(error)}
          requestUrl={{
            url:
              "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api",
            useOnPlatform: "web",
          }}
        />
      </View>

      <MapView
        provider={PROVIDER_GOOGLE}
        style={(styles.modalView, { minHeight: 300 })}
        region={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.006866,
        }}
        showsUserLocation
      >
        <Marker
          draggable={true}
          coordinate={{
            latitude: location.latitude,
            longitude: location.longitude,
          }}
          centerOffset={{ x: -42, y: -60 }}
          anchor={{ x: 0.84, y: 1 }}
          title={location.description}
          onDragEnd={(e) => {
            setPin({
              latitude: e.nativeEvent.coordinate.latitude,
              longitude: e.nativeEvent.coordinate.longitude,
            });
            setLocation({
              latitude: e.nativeEvent.coordinate.latitude,
              longitude: e.nativeEvent.coordinate.longitude,
            });
          }}
        ></Marker>
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 10,
    alignItems: "center",
    // paddingTop: Constants.statusBarHeight + 10,
    backgroundColor: "#ffffff",
  },
  centeredView: {
    flex: 1,
    // justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 10,
    backgroundColor: "white",
    borderRadius: 30,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default App;
