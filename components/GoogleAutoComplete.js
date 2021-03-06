import React, { useState } from "react";
import Axios from "axios";
import { View, StyleSheet } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import colors from "./Config/colors";
import { widthPixel, heightPixel, fontPixel, pixelSizeVertical, pixelSizeHorizontal} from "./Config/responsive"

if (process.env.NODE_ENV !== "production") require("../secrets");
const GOOGLE_PLACES_API_KEY = process.env.GOOGLE_PLACES_API_KEY;

//auto complete with geocoding info
const App = ({ location, setLocation }) => {
  const [pin, setPin] = useState({});

  return (
    <View style={styles.modalView}>
      <View
        style={{
          paddingVertical: pixelSizeVertical(12),
          borderRadius: 20,
        }}
      >
        <GooglePlacesAutocomplete
          styles={{
            textInputContainer: {
              borderRadius: 10,
              height: heightPixel(50),
              alignItems: "flex-start",
              marginBottom: pixelSizeVertical(10),
              marginTop: 0,
            },
            textInput: {
              borderRadius: 15,
              height: heightPixel(54),
              color: "grey",
              backgroundColor: colors.light,
              padding: pixelSizeVertical(5),
              margin: 0,
            },
          }}
          placeholder="Meet up Location"
          query={{
            key: GOOGLE_PLACES_API_KEY,
            language: "en",
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
  centeredView: {
    flex: 1,
    alignItems: "center",
    marginTop: pixelSizeVertical(22),
  },
  modalView: {
    margin: pixelSizeVertical(10),
    backgroundColor: "white",
    borderRadius: 30,
    elevation: 5,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: pixelSizeVertical(15),
    textAlign: "center",
  },
});

export default App;
