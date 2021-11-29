import React from 'react';
import { Text, View, Dimensions, StyleSheet, SafeAreaView, Image } from 'react-native';
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import BottomNavigator from '../components/BottomNavigator';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 40.73;
const LONGITUDE = -73.99;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const SPACE = 0.01;

const listings = [
  {
    id: 1,
    title: "Red jacket for sale",
    price: 100,
    image: require("../assets/jacket.jpg"),
    latitude: 40.73,
    longitude: -73.99
  },
  {
    id: 2,
    title: "Couch in great condition",
    price: 1000,
    image: require("../assets/couch.jpg"),
    latitude: 40.73,
    longitude: -74
  },
  {
    id: 1,
    title: "Memory foam mattress - slight wear",
    price: 500,
    image: require("../assets/jacket.jpg"),
    latitude: 40.72,
    longitude: -73.98
  }
];

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
    };
  }
  render() {
    return (
      // <View style={styles.container}>
        <SafeAreaView>
          {/* <Text>Email: {auth.currentUser?.email}</Text> */}
            <SafeAreaView style={{
              backgroundColor: "#E4EFE7",
              width: '100%',
              height: 80,
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
              position: 'center'
            }}>
              <Text style={{
                 color: 'black',
                 fontWeight: 'bold',
                 fontSize: 16,
                 textAlign: 'center'
              }}>Hi, welcome!</Text>
            </SafeAreaView>

        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={this.state.region}
          onPress={this.onMapPress}
          loadingEnabled
          loadingIndicatorColor='#666666'
          loadingBackgroundColor='#EEEEEE'
        >
          {/* <Marker
            coordinate={{
              latitude: LATITUDE - SPACE,
              longitude: LONGITUDE - SPACE,
            }}
            centerOffset={{ x: -42, y: -60 }}
            anchor={{ x: 0.84, y: 1 }}
          >
            <Callout>
              <View>
                <Text>Pick up</Text>
              </View>
            </Callout> */}
          {/* </Marker> */}
          {listings.map((listing, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: listing.latitude,
                longitude: listing.longitude,
              }}
              centerOffset={{ x: -42, y: -60 }}
              anchor={{ x: 0.84, y: 1 }}
              title={listing.title}
            >
              <Callout>
                  <Text>
                    {listing.title}
                    {listing.price}
                    <Image style={{
                      width: 40,
                      height: 40
                      }}
                      source={listing.image}>
                    </Image>
                  </Text>
              </Callout>
            </Marker>
          ))}
        </MapView>
        {/* <View style={styles.buttonContainer}>
          <View style={styles.bubble}>
            <Text>Map with Loading</Text>
          </View>
        </View> */}
        {/* <BottomNavigator/> */}
        {/* </View>  */}
    </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    height: 700,
  },
  bubble: {
    backgroundColor: "#E4EFE7",
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    backgroundColor: 'transparent'
  },
});