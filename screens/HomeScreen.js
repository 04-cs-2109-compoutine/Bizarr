import { useNavigation } from '@react-navigation/native'
import { useState } from 'react'
import { Marker } from 'google-maps-react';
import * as React from 'react';
import { PROVIDER_GOOGLE } from 'react-native-maps';
// import { useEffect } from 'react-'
import { StyleSheet, Text, TouchableOpacity, View, SafeAreaView, Dimensions } from 'react-native'
import { auth } from '../firebase'
import MapView, { Callout } from 'react-native-maps';

const HomeScreen = () => {
  
  const GoogleMapApp = () => {
    const [region, setRegion] = useState({
      latitude: 51.5079145,
      longitude: -0.0899163,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    });
    const [pin, setPin] = useState({
      latitude: 37.78825,
      longitude: -122.4324,
    })
    return (
      <View style={styles.container}>
        <MapView style={styles.map} 
        provider={PROVIDER_GOOGLE}
        intialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        onRegionChangeComplete={(region) => setRegion(region)}
        >
        <Marker coordinate={pin} pinColor="green"
        draggable={true}
        onDragStart={(e) => {
          console.log("Drag Start", e.nativeEvent.coordinates)
        }}
        onDragEnd={(e) => {
          setPin({
            lattitude: e.nativeEvent.coordinate.latitude,
            longitude: e.nativeEvent.coordinate.longitude
          })
        }}
        > 
        <Callout>
          <Text> hello poopy pants </Text>
        </Callout>
        </Marker>
      </MapView>
      </View>
    );
  }
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
    width: 400,
    height: 400,
    borderRadius: 8,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  
})
