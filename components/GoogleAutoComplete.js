import React, { useState } from "react";
import { View, StyleSheet, Text, SafeAreaView, Image } from "react-native";
import Constants from "expo-constants";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from "react-native-maps";

if (process.env.NODE_ENV !== "production") require("../secrets");
const GOOGLE_PLACES_API_KEY = process.env.GOOGLE_PLACES_API_KEY;

//auto complete with geo coding info
const App = () => {
  const [location, setLocation] = useState({
    latitude: 40.7675,
    longitude: 73.8331,
  });
  const [pin, setPin] = useState({});

  return (
    // <View style={styles.container}>
    //   <GooglePlacesAutocomplete
    //     placeholder="Search"
    //     query={{
    //       key: GOOGLE_PLACES_API_KEY,
    //       language: "en", // language of the results
    //     }}
    //     onPress={(data, details = null) => console.log(data)}
    //     onFail={(error) => console.error(error)}
    //     requestUrl={{
    //       url:
    //         "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api",
    //       useOnPlatform: "web",
    //     }} // this in only required for use on the web. See https://git.io/JflFv more for details.
    //   />
    <MapView
      style={styles.map}
      provider={PROVIDER_GOOGLE}
      intialRegion={{
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
      loadingEnabled
      loadingIndicatorColor="#666666"
      loadingBackgroundColor="#EEEEEE"
      // onRegionChangeComplete={(location) => setLocation(location)}
    >
      <Marker
        coordinate={location}
        pinColor="green"
        draggable={true}
        onDragStart={(e) => {
          console.log("Drag Start", e.nativeEvent.coordinates);
        }}
        onDragEnd={(e) => {
          setPin({
            latitude: e.nativeEvent.coordinate.latitude,
            longitude: e.nativeEvent.coordinate.longitude,
          });
        }}
      >
        <Callout>
          <Text>
            <Image
              style={{
                width: 40,
                height: 40,
              }}
              source={{
                uri:
                  "https://static.wikia.nocookie.net/bean-canon/images/b/b2/F93cb3f43339837a65a7a7829cf8e0a4.jpg/revision/latest/scale-to-width-down/250?cb=20190420041811",
              }}
            ></Image>
          </Text>
        </Callout>
      </Marker>
    </MapView>
    //</View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingTop: Constants.statusBarHeight + 10,
    backgroundColor: "#ecf0f1",
  },
});

export default App;

//---------------------------------AUTOCOMPLETE WITH FORM CODE(not react)-----------------
//autocomplete
// ("use strict");

// function initMap() {
//   const componentForm = [
//     "location",
//     "locality",
//     "administrative_area_level_1",
//     "country",
//     "postal_code",
//   ];
//   const map = new google.maps.Map(document.getElementById("map"), {
//     zoom: 11,
//     center: { lat: 37.4221, lng: -122.0841 },
//     mapTypeControl: false,
//     fullscreenControl: true,
//     zoomControl: true,
//     streetViewControl: true,
//   });
//   const marker = new google.maps.Marker({ map: map, draggable: false });
//   const autocompleteInput = document.getElementById("location");
//   const autocomplete = new google.maps.places.Autocomplete(autocompleteInput, {
//     fields: ["address_components", "geometry", "name"],
//     types: ["address"],
//   });
//   autocomplete.addListener("place_changed", function () {
//     marker.setVisible(false);
//     const place = autocomplete.getPlace();
//     if (!place.geometry) {
//       // User entered the name of a Place that was not suggested and
//       // pressed the Enter key, or the Place Details request failed.
//       window.alert("No details available for input: '" + place.name + "'");
//       return;
//     }
//     renderAddress(place);
//     fillInAddress(place);
//   });

//   function fillInAddress(place) {
//     // optional parameter
//     const addressNameFormat = {
//       street_number: "short_name",
//       route: "long_name",
//       locality: "long_name",
//       administrative_area_level_1: "short_name",
//       country: "long_name",
//       postal_code: "short_name",
//     };
//     const getAddressComp = function (type) {
//       for (const component of place.address_components) {
//         if (component.types[0] === type) {
//           return component[addressNameFormat[type]];
//         }
//       }
//       return "";
//     };
//     document.getElementById("location").value =
//       getAddressComp("street_number") + " " + getAddressComp("route");
//     for (const component of componentForm) {
//       // Location field is handled separately above as it has different logic.
//       if (component !== "location") {
//         document.getElementById(component).value = getAddressComp(component);
//       }
//     }
//   }

//   function renderAddress(place) {
//     map.setCenter(place.geometry.location);
//     marker.setPosition(place.geometry.location);
//     marker.setVisible(true);
//   }
// }
