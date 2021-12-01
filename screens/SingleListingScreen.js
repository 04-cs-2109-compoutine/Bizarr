import React from "react";
import { View, StyleSheet, Image, ScrollView } from "react-native";
import colors from "../components/Config/colors";
import ListItem from "../components/ListItem";
import LoadingMap from "../components/LocationMap";
import Text from "../components/Config/Text";
import SubmitButton from "../components/Button/SubmitButton";
import routes from "../components/Config/routes";
import Screen from "../components/Screen";

function SingleListingScreen({ route, navigation }) {
  const listing = route.params;
  console.log(listing.location)
  return (
    <ScrollView style={styles.screen}>
      <Image style={styles.image} source={{uri: listing.images}} />
      <View style={styles.detailsContainer}>
          <Text style={styles.title}>{listing.title}</Text>
        <View style={styles.message}>
          <Text style={styles.price}>${listing.price}</Text>
          <SubmitButton title="Message" onPress={() => navigation.navigate(routes.SINGLE_MESSAGE)}/>
        </View>
      </View>
      <View style={styles.sellerContainer}>
        <ListItem
          image={require("../assets/user.png")}
          title="Snow White"
          subTitle="25 Listings"
        />
      </View>
      <View>
        <LoadingMap 
          latitude={listing.location.latitude} 
          longitude={listing.location.longitude}/>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 10,
    backgroundColor: colors.white,
  },
  detailsContainer: {
    padding: 10,
  },
  image: {
    width: "100%",
    height: 300,
  },
  price: {
    color: colors.secondary,
    fontWeight: "bold",
    fontSize: 20,
    marginVertical: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "500",
  },
  sellerContainer:{
    marginBottom: 10
  },
  message:{
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline'
  }
});

export default SingleListingScreen;