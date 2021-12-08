import React from 'react';
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import { db } from '../firebase'
import { View, Text, Dimensions, StyleSheet, SafeAreaView, Image, ScrollView, StatusBar} from "react-native";
import { SliderBox } from "react-native-image-slider-box";
import { SearchBar } from "react-native-elements";
import Searchbar from "../components/SearchBar" 
import * as Location from 'expo-location'
import colors from "../components/Config/colors";
import defaultStyles from '../components/Config/styles';
import HorizontalListing from '../components/HorizontalListing';

// setting up for a default region and map view size
const { width, height } = Dimensions.get("window");
const ASPECT_RATIO = width / height;
const LATITUDE = 40.73;
const LONGITUDE = -73.99;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const SPACE = 0.01;

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.getLocation = this.getLocation.bind(this);
    this.state = {
      listings: [],
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      search: "",
    };
  }

  // function to request permissions to get user's location
   async getLocation() {
    try {
      const {granted} = await Location.requestForegroundPermissionsAsync();
      if (!granted) return 'Allow current location to see listings in your area.';
      const { coords: { latitude, longitude }} = await Location.getCurrentPositionAsync();
      this.setState({...this.state,
        region: {
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LATITUDE_DELTA * ASPECT_RATIO
        }
      })
    } catch(error) {
        console.log(error);
      }
  }
  
  componentDidMount() {
    this.getLocation();
    const listings = db
    .collection("listings")
    .onSnapshot((snapshot) =>
      this.setState({...this.state,
        listings: snapshot.docs.map((doc) => ({
          description: doc.data().description,
          images: doc.data().images,
          title: doc.data().title,
          location: doc.data().location,
        }))
      })
    )
    return listings;
  }

  updateSearch(search) {
    this.setState({ search });
  }

  render() {
    const search = this.state.search;
    return (
      <SafeAreaView>
        <Image 
          style={styles.header}
          source={require("../assets/B.png")}
        />
        <ScrollView>
          <Text style={styles.text}> 
            Shop nearby
          </Text>
          <HorizontalListing />
          <Searchbar
            onChangeText={this.updateSearch}
            value={search}
          />
          <View>
            <View style={styles.mapContainer}>
              <MapView
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                region={this.state.region}
                onPress={this.onMapPress}
                loadingEnabled
                loadingIndicatorColor='#666666'
                loadingBackgroundColor='#EEEEEE'
              >
              {this.state.listings.map((listing, index) => (
                <Marker
                  key={index}
                  coordinate = {{
                    latitude: listing.location.latitude,
                    longitude: listing.location.longitude,
                  }}
                  centerOffset={{ x: -42, y: -60 }}
                  anchor={{ x: 0.84, y: 1 }}
                  title={listing.title}
                >
                  <Callout>
                    <Text>
                      <Image 
                        style={{width: 40, height: 40 }}
                        source={{uri: listing.images[0]}}>
                      </Image>
                    </Text>
                  </Callout>
                </Marker>
              ))}
              </MapView>
            </View>
          </View>
      </ScrollView>
    </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  header:{
    marginTop: 10,
    height: 70,
    width: "50%",
    alignItems: 'center',
    marginLeft: '25%',
  },
  mapContainer:{
    marginLeft: 10, marginBottom: 10, marginTop: 40, width: '95%', height: 425, borderRadius: 10, borderWidth: .5, overflow: 'hidden', 
  },
  banner: {
    paddingTop: 20,
    paddingBottom: 20,
  },
  text: {
    color: "black",
    fontSize: 20,
    margin: 10,
    fontWeight: '500'
  },
  map: {
    borderWidth: 1,
    height: 500,
    width: 500,
    marginBottom: 10,
  },
  bubble: {
    backgroundColor: "#E4EFE7",
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    marginVertical: 20,
    backgroundColor: "transparent",
  },
});