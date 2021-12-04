import React from 'react';
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import { db } from '../firebase'
import { View, Text, Dimensions, StyleSheet, SafeAreaView, Image, ScrollView} from "react-native";
import { SliderBox } from "react-native-image-slider-box";
import { SearchBar } from "react-native-elements";
import * as Location from 'expo-location'

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
      images: [
        "https://res.cloudinary.com/bizarr/image/upload/v1638639248/uglywelcomebanner_y3hw3z.png",
        "https://res.cloudinary.com/bizarr/image/upload/v1638639249/banner2_evzipt.png",
        "https://thecrossingsofdawsonville.com/wp-content/uploads/sites/14/2019/07/Welcome-to-the-team-1200x565.jpg",
        "https://www.creativefabrica.com/wp-content/uploads/2020/09/23/WELCOME-Graphics-5632158-1.jpg",
        "https://media.istockphoto.com/photos/on-colourful-speech-bubbles-picture-id180819641?b=1&k=20&m=180819641&s=170667a&w=0&h=CX51cRVofQl95e_cu9Bfy5PLZQ1WdsqmJ-NCFzU96UI=",
        "https://mobilemonkey.com/wp-content/uploads/2020/12/welcome-greeting-message.png",
        "https://img.pixers.pics/pho_wat(s3:700/FO/53/86/52/14/700_FO53865214_8d9a5b68feceb7b851e95b5a8f6fd218.jpg,700,525,cms:2018/10/5bd1b6b8d04b8_220x50-watermark.png,over,480,475,jpg)/stickers-welcome-tag-cloud-customer-service-greetings-home-smile-card.jpg.jpg",
      ],
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

  // when the component mounts, request user location and then retrieve listings from firebase to display as markers on the map view
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
              <SearchBar
                placeholder="Type Here..."
                onChangeText={this.updateSearch}
                value={search}
                showCancel
                lightTheme
              />
              <View style={styles.banner}>
                <SliderBox images={this.state.images} />
              </View>
                <MapView
                  provider={PROVIDER_GOOGLE}
                  style={styles.map}
                  initialRegion={this.state.region}
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
                        <Image style={{
                          width: 40,
                          height: 40
                          }}
                          source={{uri: listing.images}}>
                        </Image>
                      </Text>
                  </Callout>
                </Marker>
              ))}
            </MapView>
    </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  banner: {
    marginVertical: 10,
  },
  text: {
    color: "black",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
    margin: 15,
  },
  map: {
    height: 500,
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
