import { useNavigation } from '@react-navigation/native'
import { useState } from 'react'
import { Marker } from 'google-maps-react';
import * as React from 'react';
import { PROVIDER_GOOGLE } from 'react-native-maps';
// import { useEffect } from 'react-'
import { StyleSheet, Text, TouchableOpacity, View, SafeAreaView, Dimensions } from 'react-native'
import { auth } from '../firebase'
import MapView, { Callout } from 'react-native-maps';
// import { useLocation } from '../components/useLocation';
import * as Location from 'expo-location';


const listings = [
  {
    id: 1,
    title: "Red jacket for sale",
    price: 100,
    image: require("../assets/jacket.jpg"),
  },
  {
    id: 2,
    title: "Couch in great condition",
    price: 1000,
    image: require("../assets/couch.jpg"),
  },
];

const HomeScreen = () => {
  // const [region, setRegion] = useState({
  //   latitude: 51.5079145,
  //   longitude: -0.0899163,
  //   latitudeDelta: 0.01,
  //   longitudeDelta: 0.01,
  // });
  // const [pin, setPin] = useState({
  //   latitude: 37.78825,
  //   longitude: -122.4324,
  // })
  // const GoogleMapApp = () => {
    const [location, setLocation] = useState();

    const getLocation = async () => {
      try {
        const { granted } = await Location.requestForegroundPermissionsAsync();
        if (!granted) return "Allow current location to view all listings.";
        const {
          coords: { latitude, longitude },
        } = await Location.getLastKnownPositionAsync();
        setLocation({ latitude, longitude });
      } catch (error) {
        console.log(error);
      }
    }
    React.useEffect(() => {
        getLocation();
    }, [])
    console.log(location)
    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.container}>
          {/* <Text>Email: {auth.currentUser?.email}</Text> */}
            <View style={{
              backgroundColor: "#E4EFE7",
              width: '50%',
              height: 70,
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <Text>Hi, welcome!</Text>
            </View>
          </SafeAreaView>
            {!location ? 'Waiting' :
              <MapView style={styles.map}
                provider={PROVIDER_GOOGLE}
                intialRegion={{
                  latitude: location.latitude,
                  longitude: location.longitude,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}
                // onRegionChangeComplete={(location) => setLocation(location)}
              >
                {/* <Marker coordinate={location} pinColor="green"
                  draggable={true}
                  onDragStart={(e) => {
                    console.log("Drag Start", e.nativeEvent.coordinates)
                  }}
                  onDragEnd={(e) => {
                    setPin({
                      latitude: e.nativeEvent.coordinate.latitude,
                      longitude: e.nativeEvent.coordinate.longitude
                    })
                  }}
                > */}
                  <Callout>
                    <Text> hello poopy pants </Text>
                  </Callout>
                {/* </Marker> */}
              </MapView>
            }
        </View>
    );}
  // }

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.navigate("Login")
      })
      .catch(error => alert(error.message))
  }
  // return (
  //   // <View style={styles.container}>
  //      /* <MapContainer /> */
  //      /* <View style={styles.container}> */
  //       /* <MapContainer /> */
  //         <SafeAreaView style={styles.container}>
  //         {/* <Text>Email: {auth.currentUser?.email}</Text> */}
  //           <View style={{
  //             backgroundColor: "#E4EFE7",
  //             width: '50%',
  //             height: 70,
  //             borderRadius: 10,
  //             justifyContent: 'center',
  //             alignItems: 'center'
  //           }}>
  //             <Text>Hi, welcome!</Text>
  //           </View>
  //           <TouchableOpacity
  //             onPress={GoogleMapApp}
  //             style={styles.button}
  //           >
  //           {/* <Text style={styles.buttonText}>Sign out</Text> */}
  //             <Text style={styles.buttonText}>Set My Current Location</Text>
  //           </TouchableOpacity>
  //         </SafeAreaView>
  //       /* <GoogleMapApp /> */
  //     /* </View> */
  //   // </View>
  // )


export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
   button: {
    backgroundColor: '#74B49B',
    width: '50%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 40,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  map: {
    width: 300,
    height: 400,
    borderRadius: 8,
    justifyContent: "flex-end",
    alignItems: "center",
  },

})
