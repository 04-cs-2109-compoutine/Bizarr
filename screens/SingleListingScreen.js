import React from "react";
import { View, StyleSheet, Image } from "react-native";
import colors from "../components/Config/colors";
import ListItem from "../components/ListItem";
import LoadingMap from "../components/LocationMap";
import Text from "../components/Config/Text";
import SubmitButton from "../components/Button/SubmitButton";
import routes from "../components/Config/routes";

function SingleListingScreen({ route, navigation }) {
  const listing = route.params;
  return (
    <View>
      <Image style={styles.image} source={listing.image} />
      <View style={styles.detailsContainer}>
        <View>
          <Text style={styles.title}>{listing.title}</Text>
          <Text style={styles.price}>${listing.price}</Text>
        </View>
          <SubmitButton title="Message" onPress={() => navigation.navigate(routes.SINGLE_MESSAGE)}/>
      </View>
      <View style={styles.sellerContainer}>
        <ListItem
          image={require("../assets/user.png")}
          title="Snow White"
          subTitle="25 Listings"
        />
      </View>
      <View>
        <LoadingMap/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  detailsContainer: {
    padding: 15,
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
    marginBottom: 20
  }
});

export default SingleListingScreen;