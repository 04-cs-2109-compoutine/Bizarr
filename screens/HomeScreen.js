import { useNavigation } from '@react-navigation/native'
import React from 'react'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { StyleSheet, Text, TouchableOpacity, View, SafeAreaView } from 'react-native'
// SafeAreaView to keep content in safe area
import { auth } from '../firebase'
import * as Location from 'expo-location'
import MyMap from '../MyMap'

const HomeScreen = () => {
  // commenting out because we probably dont need a 'back' button
  const navigation = useNavigation()

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.navigate("Login")
      })
      .catch(error => alert(error.message))
  }

  // let map;

  // const initMap = () => {
  //   map = new google.maps.Map(document.getElementById("map"), {
  //     center: { lat: -34.397, lng: 150.644 },
  //     zoom: 8,
  //   });
  // }

  return (
    <SafeAreaView style={styles.container}>
      {/* <Text>Email: {auth.currentUser?.email}</Text> */}
      <View style={{
        backgroundColor: "#E4EFE7",
        width: '50%',
        height: '70',
        justifyContent: 'center'
      }}>
        <Text>Hi, welcome!</Text>
      </View>
      <TouchableOpacity
        onPress={handleSignOut}
        style={styles.button}
      >
        {/* <Text style={styles.buttonText}>Sign out</Text> */}
        <Text style={styles.buttonText}>Set My Current Location</Text>
      </TouchableOpacity>
        <MapView
          key={"AIzaSyAbids5u5V37mkGJ-cPeoxS2bUjUBnduSg"}
          style={{ flex: 1, margin: 15 }}
          region={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0992,
            longitudeDelta: 0.0421
          }}
          />
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
   button: {
    backgroundColor: '#74B49B',
    // changed color
    width: '60%',
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
})
