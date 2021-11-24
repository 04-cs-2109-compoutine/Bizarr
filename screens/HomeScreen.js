import { useNavigation } from '@react-navigation/native'
import React from 'react'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { StyleSheet, Text, TouchableOpacity, View, SafeAreaView } from 'react-native'
// SafeAreaView to keep content in safe area
import { auth } from '../firebase'
import * as Location from 'expo-location'

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

  return (
    <View style={styles.container}>
      {/* <Text>Email: {auth.currentUser?.email}</Text> */}
      <Text>Hi, welcome!</Text>
      <TouchableOpacity
        onPress={handleSignOut}
        style={styles.button}
      >
        {/* <Text style={styles.buttonText}>Sign out</Text> */}
        <Text style={styles.buttonText}>Set My Current Location</Text>
      </TouchableOpacity>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 37.78825,
          longitude: 122.4324,
          latitudeDelta: 0.0992,
          longitudeDelta: 0.0421
        }}
        />
    </View>
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
})
