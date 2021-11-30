import React from 'react';
import { StyleSheet, FlatList, ScrollView, View, SafeAreaView} from 'react-native';
import List from "../components/List";
import colors from "../components/Config/colors";
import routes from "../components/Config/routes";
import Screen from "../components/Screen";

const listings = [
  {
    id: 1,
    title: "Couch in great condition",
    Description: " This couch is in great condition,We just bought it last year",
    price: 200,
    image: require("../assets/couch.jpg"),
    userId: 1
  },
  {
    id: 2,
    title: "Couch in great condition",
    Description: " This couch is in great condition,We just bought it last year",
    price: 200,
    image: require("../assets/couch.jpg"),
    userId: 1
  },
  {
    id: 3,
    title: "Bike in great condition",
    Description: " This bike is almost new, I barely use it",
    price: 1000,
    image: require("../assets/bike.png"),
    userId: 1
  },
  {
    id: 4,
    title: "Camera in great condition",
    price: 2000,
    image: require("../assets/camera.png"),
    userId: 1
  },
  {
    id: 5,
    title: "Couch in great condition",
    Description: " This couch is in great condition,We just bought it last year",
    price: 200,
    image: require("../assets/couch.jpg"),
    userId: 1
  },
  {
    id: 6,
    title: "Couch in great condition",
    Description: " This couch is in great condition,We just bought it last year",
    price: 200,
    image: require("../assets/couch.jpg"),
    userId: 1
  },
];

function MyListingScreen({navigation}) {
  return (
    <Screen style={styles.screen}>
      <FlatList
        data={listings}
        keyExtractor={(listing) => listing.id.toString()}
        renderItem={({ item }) => (
          <List
            title={item.title}
            subTitle={"$" + item.price}
            image={item.image}
            onPress={() => navigation.navigate(routes.LISTING_DETAILS, item)}
          />
        )}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 20,
    backgroundColor: colors.light,
  },
});

export default MyListingScreen;