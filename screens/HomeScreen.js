import React, {useEffect, useState, useContext} from 'react';
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import { db } from '../firebase'
import { View, Text, Dimensions, StyleSheet, SafeAreaView, Image, ScrollView, StatusBar, TouchableOpacity} from "react-native";
import Swiper from 'react-native-swiper';
import Searchbar from "../components/SearchBar" 
import * as Location from 'expo-location'
import HorizontalListing from '../components/HorizontalListing';
import AuthContext from "../components/Config/context";
import {useTheme} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import routes from '../components/Config/routes';
import LottieView from "lottie-react-native";

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
  const [region, setRegion] = useState({
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      })
  const [search, setSearch] = useState("");
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
      setListings(userLists)
    } catch(e) {
      console.log(e);
    }
  }

  useEffect(() => {
    readAllListing();
  }, []);

  useEffect(()=>{
    getLocation();
  }, [])

  const updateSearch = (search)=>{
    setSearch({ search });
  }

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

      <View style={styles.santaContainer}>
        <Text style={styles.sectionHeader}> 
          Find your items
        </Text>
        <LottieView
            autoPlay
            loop
            source={require("../assets/animations/santa-pop-up.json")}
            style={styles.animation}
          />
      </View>
        
        <View style={styles.searchBar}>
          <Searchbar
            onChangeText={updateSearch}
            value={search}
          />
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
        <LottieView
            autoPlay
            loop
            source={require("../assets/animations/loading-button.json")}
            style={styles.dotanimation}
          />
       
        <Text style={styles.text}>Made for you</Text>
       
        <View style={styles.listingContainer}>
          <HorizontalListing listings={listings}/>
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
    height: 200,
    width: '100%',
    marginTop: 10,
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
    marginTop: 10,
    height: 70,
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
    paddingTop: 20,
    paddingBottom: 20,
  },
  map: {
    // borderWidth: 0,
    height: 300,
    marginBottom: 10,
    borderColor: '#79B4B7'
  },
  buttonContainer: {
    flexDirection: "row",
    marginVertical: 20,
    backgroundColor: "transparent",
  },
  sectionHeader: {
    fontWeight: '700',
    fontSize: 18,
    marginTop: 20,
    marginBottom: 5,
    color: "#515E63",
    alignSelf:'flex-start'
  },
  categoryContainer: {
    flexDirection: 'row',
    width: '90%',
    alignSelf: 'center',
    marginTop: 25,
    marginBottom: 10,
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
    width: 60,
    height: 60,
    backgroundColor: '#FBF6F0' /* '#5c8d89' */,
    borderRadius: 50,
  },
  categoryBtnTxt: {
    alignSelf: 'center',
    marginTop: 5,
    color: '#5c8d89',
    fontSize: 12
  },
  searchBar:{
    marginBottom: 10
  },
  animation: {
    width: 60,
    alignSelf:'baseline',
    marginLeft: 60
  },
  santaContainer:{
    flex: 1,
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  listingContainer:{
    marginTop: 5
  },
  LoadContainer:{
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text:{
    fontWeight: '700',
    fontSize: 18,
    marginTop: 50,
    marginBottom: 5,
    color: "#515E63",
  },
  dotanimation:{
    width: 80,
    marginLeft: '28%'
  }
});

export default HomeScreen;