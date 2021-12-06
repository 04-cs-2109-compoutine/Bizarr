import React from 'react';
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import { db } from '../firebase'
import { View, Text, Dimensions, StyleSheet, SafeAreaView, Image, ScrollView, StatusBar} from "react-native";
import { SliderBox } from "react-native-image-slider-box";
import { SearchBar } from "react-native-elements";
import Searchbar from "../components/SearchBar" 
import * as Location from 'expo-location'
import colors from "../components/Config/colors"
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
        <View>

            <Image 
              style={{
                height: 150,
                width: 150,
                marginTop: 0,
                marginLeft: 130
              }}
              source={require("../assets/B.png")}
              />
                          <Image 
              style={{
                // marginTop: 100,
                marginLeft: 350,
                flex: 1,
              }}
              source={require("../assets/baseline_filter_list_black_24dp.png")}
              />
              <ScrollView>
              <Text style={styles.text}> 
            shop nearby
          </Text>
          <Searchbar
                onChangeText={this.updateSearch}
                value={search}
                // style={{ marginBottom: 50, paddingBottom: 50}}
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
                        <Image style={{
                          width: 40,
                          height: 40
                          }}
                          source={{uri: listing.images[0]}}>
                        </Image>
                      </Text>
                  </Callout>
                </Marker>
              ))}
            </MapView>
            </View>
            <View style={styles.header}>
              {/* <SearchBar
                // style={styles.header}
                placeholder="Type Here..."
                onChangeText={this.updateSearch}
                value={search}
                showCancel
                containerStyle={{backgroundColor: 'white', borderWidth: 1, borderColor: colors.light, borderRadius: 35, marginTop: 40,}}
              /> */}
               </View>
            </View>
            {/* <View style={styles.banner}>
                <SliderBox images={this.state.images} sliderBoxHeight={200}
  circleLoop/>
              </View> */}
              </ScrollView>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  header:{
    // flex: 1,
    // marginTop: StatusBar.currentHeight,
    // backgroundColor: "#F4F9F4",
    // borderBottomLeftRadius: 65,  
    // borderBottomRightRadius: 65,
    // marginTop: 0,
    // width: width,
    // height: height / 3,
  },
  container: {
    // flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
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
    fontSize: 18,
    marginLeft: 35,
    paddingBottom: 15,
  },
  // headerText: {
  //   // flex: 1,
  //   // color: "black",
  //   // fontWeight: "bold",
  //   // fontSize: 36,
  //   // marginTop: 75,
  //   // flex: .5,
  //   flexDirection: 'row',
  //   // // paddingBottom: 30,
  //   // marginLeft: 0,
  //   // marginBottom: 0,
  //   borderBottomLeftRadius: 35,
  //   borderBottomRightRadius: 35,
  //   height: 75,
  //   width: 75
  // },
  map: {
    // paddingTop: 30,
    // paddingBottom: 30,
    borderWidth: 1,
    // flex: 1,
    height: 500,
    width: 500,
    // borderRadius: 10,
    // borderTopLeftRadius: 15,
    // borderTopRightRadius: 15,
     marginBottom: 15,
    //  overflow: 'hidden'
    // height: height / 2,
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
