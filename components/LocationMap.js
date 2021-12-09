import React from 'react';
import { Text, View, Dimensions, StyleSheet } from 'react-native';
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import { widthPixel, heightPixel, fontPixel, pixelSizeVertical, pixelSizeHorizontal} from "./Config/responsive"


const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const SPACE = 0.01;

function LoadingMap ({latitude, longitude}){
  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        loadingEnabled
        initialRegion={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }}
        loadingIndicatorColor="#666666"
        loadingBackgroundColor="#eeeeee">
        <Marker
          coordinate={{
            latitude: latitude - SPACE,
            longitude: longitude - SPACE,
          }}
          centerOffset={{ x: -42, y: -60 }}
          anchor={{ x: 0.84, y: 1 }}>
          <Callout>
            <View>
              <Text>Pick up</Text>
            </View>
          </Callout>
        </Marker>
      </MapView>
      <View style={styles.buttonContainer}>
        <View style={styles.bubble}>
          <Text>Map with Loading</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    height: heightPixel(250),
  },
  bubble: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: pixelSizeHorizontal(18),
    paddingVertical: pixelSizeVertical(12),
    borderRadius: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: pixelSizeVertical(20),
    backgroundColor: 'transparent',
  },
});

export default LoadingMap;