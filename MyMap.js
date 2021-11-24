/* bellow is for google maps api */
import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

/* above is for google maps api */

export default myMap = () => {
    return (
    <View style={styles.container}>
    <MapView

    style={{ flex: 1 }}

    provider={PROVIDER_GOOGLE}

    showsUserLocation

    initialRegion={{
      latitude: 37.78825,

      longitude: -122.4324,

      latitudeDelta: 0.0922,

      longitudeDelta: 0.0421
    }}

  />  </View>)

}

const styles = StyleSheet.create({
  container:{
    alignItems: 'center',
    justifyContent: 'center',
    height: 90,
    width: 90,
    padding: 15
  }
})