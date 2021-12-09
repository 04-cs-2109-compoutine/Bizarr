import React, {useEffect, useState, useContext} from 'react';
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import { db } from '../firebase'
import { View, Text, Dimensions, StyleSheet, SafeAreaView, Image, ScrollView, StatusBar, TouchableOpacity, FlatList} from "react-native";
import Swiper from 'react-native-swiper';
import * as Location from 'expo-location'
import HorizontalListing from '../components/HorizontalListing';
import AuthContext from "../components/Config/context";
import {useTheme} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import routes from '../components/Config/routes';
import LottieView from "lottie-react-native";
import Card from '../components/Card';
import { widthPixel, heightPixel, fontPixel, pixelSizeVertical, pixelSizeHorizontal} from "../components/Config/responsive"

// setting up for a default region and map view size
const { width, height } = Dimensions.get("window");
const ASPECT_RATIO = width / height;
const LATITUDE = 40.73;
const LONGITUDE = -73.99;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const SPACE = 0.01;

const HomeScreen = ({navigation}) => {
  const theme = useTheme();
  const [listings, setListings] = useState([])
  const [picklistings, setPickListings] = useState([])

  const [region, setRegion] = useState({
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      })
  const {user, setUser} = useContext(AuthContext);

  const getLocation = async () => {
    try {
      const {granted} = await Location.requestForegroundPermissionsAsync();
      if (!granted) return 'Allow current location to see listings in your area.';
      const { coords: { latitude, longitude }} = await Location.getCurrentPositionAsync();
      setRegion({...region,
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

  async function readAllListing() {
    try {
      const getListingsPromise = db.collection("listings").get()
      const data = await getListingsPromise
      let allListings = data.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      let userLists = allListings.filter(listing => listing.uid !== user.uid && listing.sold === false)
      let datedList = userLists.sort((a, b) => b.createdAt - a.createdAt).slice(0,6)
      setListings(datedList)
      setPickListings(allListings.slice(0,10))
    } catch(e) {
      console.log(e);
    }
  }

  useEffect(() => {
    readAllListing();
    getLocation();
  }, []);
 
  return (

    <SafeAreaView style={styles.container}>
      <Image 
        style={styles.header}
        source={require("../assets/B.png")}
      />

      <ScrollView>
        <StatusBar barStyle={theme.dark ? 'light-content' : 'dark-content'} />
          <View style={styles.sliderContainer}>
            <Swiper
              autoplay
              horizontal={false}
              height={200}
              activeDotColor= "#74b49b">
              <View style={styles.slide}>
                <Image
                  source={require('../assets/banner2.jpg')}
                  resizeMode="cover"
                  style={styles.sliderImage}
                />
              </View>
              <View style={styles.slide}>
                <Image
                  source={require('../assets/banner3.jpg')}
                  resizeMode="cover"
                  style={styles.sliderImage}
                />
              </View>
              <View style={styles.slide}>
                <Image
                  source={require('../assets/banner4.jpg')}
                  resizeMode="cover"
                  style={styles.sliderImage}
                />
              </View>
              <View style={styles.slide}>
                <Image
                  source={require('../assets/banner5.jpg')}
                  resizeMode="cover"
                  style={styles.sliderImage}
                />
              </View>
              <View style={styles.slide}>
                <Image
                  source={require('../assets/banner6.jpg')}
                  resizeMode="cover"
                  style={styles.sliderImage}
                />
              </View>
            </Swiper>
          </View>

      <View style={styles.categoryContainer}>
        <TouchableOpacity
          style={styles.categoryBtn}
          onPress={() => navigation.navigate(routes.FURNITURE)}>
          <View style={styles.categoryIcon}>
            <MaterialCommunityIcons name="floor-lamp" size={35} color="#74b49b" />
          </View>
          <Text style={styles.categoryBtnTxt}>Furniture</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.categoryBtn}
          onPress={() => navigation.navigate(routes.CAR)}>
          <View style={styles.categoryIcon}>
            <MaterialCommunityIcons
              name="car"
              size={35}
              color="#74b49b"
            />
          </View>
          <Text style={styles.categoryBtnTxt}>Cars</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.categoryBtn}
          onPress={() => navigation.navigate(routes.ELECTRONICS)}>
          <View style={styles.categoryIcon}>
            <MaterialCommunityIcons name="camera-enhance" size={35} color="#74b49b" />
          </View>
          <Text style={styles.categoryBtnTxt}>Electronics</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.categoryBtn}
          onPress={() => navigation.navigate(routes.BOOKS)}>
          <View style={styles.categoryIcon}>
            <Ionicons name="book-outline" size={35} color="#74b49b" />
          </View>
          <Text style={styles.categoryBtnTxt}>Books</Text>
        </TouchableOpacity>
      </View>

      <View style={[styles.categoryContainer, {marginTop: 10}]}>
        <TouchableOpacity
          style={styles.categoryBtn}
          onPress={() => navigation.navigate(routes.CLOTHING)}>
          <View style={styles.categoryIcon}>
            <Ionicons name="shirt" size={35} color="#74b49b" />
          </View>
          <Text style={styles.categoryBtnTxt}>Clothing</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.categoryBtn}
          onPress={() => navigation.navigate(routes.SPORTS)}>
          <View style={styles.categoryIcon}>
            <MaterialIcons name="sports-baseball" size={35} color="#74b49b" />
          </View>
          <Text style={styles.categoryBtnTxt}>Sports</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.categoryBtn}
          onPress={() => navigation.navigate(routes.ENTERTAINMENT)}>
          <View style={styles.categoryIcon}>
            <Ionicons name="musical-notes-outline" size={35} color="#74b49b" />
          </View>
          <Text style={styles.categoryBtnTxt}>Entertainment</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.categoryBtn}
          onPress={() => navigation.navigate(routes.OTHERS)}>
          <View style={styles.categoryIcon}>
            <MaterialIcons name="expand-more" size={35} color="#74b49b" />
          </View>
          <Text style={styles.categoryBtnTxt}>Others</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.seperatorContainer}>
        <LottieView 
          autoPlay
          loop
          source={require("../assets/animations/seperator.json")}
          style={styles.seperator}
        />
        <LottieView 
          autoPlay
          loop
          source={require("../assets/animations/seperator.json")}
          style={styles.seperator}
        />
      </View>
      
      <View style={styles.lottieView}>
        <LottieView 
          autoPlay
          loop
          source={require("../assets/animations/train.json")}
          style={styles.animation}
        />
      </View>

      <View style={styles.seperatorContainer}>
        <LottieView 
          autoPlay
          loop
          source={require("../assets/animations/seperator.json")}
          style={styles.seperator}
        />
        <LottieView 
          autoPlay
          loop
          source={require("../assets/animations/seperator.json")}
          style={styles.seperator}
        />
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.text}>Shop Locally</Text>
      </View>

      <View>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          region={region}
          loadingEnabled
          loadingIndicatorColor='#666666'
          loadingBackgroundColor='#EEEEEE'
        >
        {listings.map((listing, index) => (
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
            <Callout onPress={() => navigation.navigate(routes.LISTING_DETAILS, listing)}>
              <Text>
                <Image
                  style={{width: widthPixel(40), height: heightPixel(40)}}
                  source={{uri: listing.images[0]}}>
                </Image>
              </Text>
            </Callout>
          </Marker>
        ))}
        </MapView>
      </View>

      <View style={styles.seperatorContainer}>
        <LottieView 
          autoPlay
          loop
          source={require("../assets/animations/seperator.json")}
          style={styles.seperator}
        />
        <LottieView 
          autoPlay
          loop
          source={require("../assets/animations/seperator.json")}
          style={styles.seperator}
        />
      </View>

      
      <View style={styles.textContainer}>
        <Text style={styles.text}>New Listings</Text>
      </View>
      <View style={styles.listingContainer}>
        <HorizontalListing listings={listings} navigation={navigation}/>
      </View>

      <View style={styles.seperatorContainer}>
        <LottieView 
          autoPlay
          loop
          source={require("../assets/animations/seperator.json")}
          style={styles.seperator}
        />
        <LottieView 
          autoPlay
          loop
          source={require("../assets/animations/seperator.json")}
          style={styles.seperator}
        />
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.text}>Made for you</Text>
      </View>
          
      <View style={styles.flatContainer}>
      <FlatList 
          data={picklistings}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <Card
            itemData={item}
            onPress={()=> navigation.navigate(routes.LISTING_DETAILS, item)}
            />
          )}
      />
      </View>

    </ScrollView>
  </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  container:{
    flex: 1,
    margin: '2%',
  },
  sliderContainer: {
    height: heightPixel(200),
    width: '100%',
    marginTop: pixelSizeVertical(10),
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 8,
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent',
    borderRadius: 8,

  },
  header:{
    marginTop: pixelSizeVertical(10),
    height: heightPixel(70),
    width: "50%",
    alignItems: 'center',
    marginLeft: '25%',
  },
  sliderImage: {
    height: '100%',
    width: '100%',
    alignSelf: 'center',
    borderRadius: 8,
  },
  banner: {
    paddingTop: pixelSizeVertical(20),
    paddingBottom: pixelSizeVertical(20),
  },
  map: {
    height: widthPixel(300),
    marginBottom: pixelSizeVertical(10),
    borderColor: '#79B4B7',
    marginTop: pixelSizeVertical(5)
  },
  buttonContainer: {
    flexDirection: "row",
    marginVertical: pixelSizeVertical(20),
    backgroundColor: "transparent",
  },
  sectionHeader: {
    fontWeight: '700',
    fontSize: fontPixel(18),
    marginTop: pixelSizeVertical(20),
    marginBottom: pixelSizeVertical(5),
    color: "#515E63",
    alignSelf:'flex-start'
  },
  categoryContainer: {
    flexDirection: 'row',
    width: '90%',
    alignSelf: 'center',
    marginTop: pixelSizeVertical(25),
    marginBottom: pixelSizeVertical(10),
  },
  categoryBtn: {
    flex: 1,
    width: '30%',
    marginHorizontal: 0,
    alignSelf: 'center',
  },
  categoryIcon: {
    borderWidth: 0,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    width: widthPixel(60),
    height: widthPixel(60),
    backgroundColor: '#FBF6F0' /* '#5c8d89' */,
    borderRadius: 50,
  },
  categoryBtnTxt: {
    alignSelf: 'center',
    marginTop: pixelSizeVertical(5),
    color: '#5c8d89',
    fontSize: fontPixel(12)
  },
  searchBar:{
    marginBottom: pixelSizeVertical(10)
  },
  listingContainer:{
    marginTop: pixelSizeVertical(5)
  },
  LoadContainer:{
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textContainer:{
    alignItems: 'center'
  },
  text:{
    fontWeight: '700',
    fontSize: fontPixel(18),
    marginTop: pixelSizeVertical(20),
    marginBottom: pixelSizeVertical(15),
    color: "#515E63",
  },
  dotanimation:{
    width: widthPixel(80),
    marginLeft: '28%'
  },
  animation:{
    height: heightPixel(120)
  },
  lottieView:{
    marginTop: pixelSizeVertical(10),
    marginBottom: pixelSizeVertical(10),
  },
  seperatorContainer:{
    flex: 1,
    flexDirection: 'row',
    marginTop: pixelSizeVertical(15),
    marginBottom: pixelSizeVertical(10),
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  },
  seperator:{
    height: heightPixel(20),
  },
  waves:{
    height: heightPixel(50),
  },
  flatContainer: {
    flex: 1, 
    width: '95%',
    alignSelf: 'center'
  },
});

export default HomeScreen;
