import React, { useState } from "react";
import { View, FlatList, StyleSheet} from "react-native";

import AllList from "../components/AllList";
import colors from "../components/colors";
import routes from "../components/routes";
import Screen from "../components/Screen";

// const listings = 

// const formatData = (listings, numColumns) =>{
//   const numberOfFullRows = Math.floor(listings.length / numColumns);
//   let numberOfElementsLastRow = listings.length - (numberOfFullRows * numColumns)
//   while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0){
//     listings.push({ key: `blank-${numberOfElementsLastRow}`, empty: true });
//     numberOfElementsLastRow = numberOfElementsLastRow + 1;
//   }
//   return listings
// }
function ListingsScreen({ navigation }) {
  const [listings, setListings] = useState([
    {
      id: 1,
      title: "Red jacket for sale",
      price: 100,
      image: require("../assets/jacket.jpg"),
    },
    {
      id: 2,
      title: "Couch in great condition",
      price: 1000,
      image: require("../assets/couch.jpg"),
    },
    {
      id: 3,
      title: "Red jacket for sale",
      price: 100,
      image: require("../assets/jacket.jpg"),
    },
    {
      id: 4,
      title: "Couch in great condition",
      price: 1000,
      image: require("../assets/couch.jpg"),
    },
    {
      id: 5,
      title: "Red jacket for sale",
      price: 100,
      image: require("../assets/jacket.jpg"),
    },
    {
      id: 6,
      title: "Couch in great condition",
      price: 1000,
      image: require("../assets/couch.jpg"),
    },
    {
      id: 7,
      title: "Red jacket for sale",
      price: 100,
      image: require("../assets/jacket.jpg"),
    },
    {
      id: 8,
      title: "Couch in great condition",
      price: 1000,
      image: require("../assets/couch.jpg"),
    },
  ])

  return (
    <Screen style={styles.screen}>
      <FlatList
        numColumns={2}
        style={styles.container}
        data={listings}
        keyExtractor={(listing, index) => listing.id} //instead of listing.id.toString()
        renderItem={({ item }) => (
          <AllList
            style={styles.list}
            title={item.title}
            // subTitle={"$" + item.price}
            image={item.image}
            // onPress={() => navigation.navigate(routes.LISTING_DETAILS, item)}
          />
        )}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: 24,
    margin: 4
    // marginHorizontal: 10,
  },
  screen: {
    backgroundColor: colors.light,
    // marginHorizontal: 10,
  },
  // list: {
  //   // padding: 5,
  //   alignItems: "center",
  //   // marginHorizontal: 10
  // },
  screen: {
    flex: 1,
    // marginHorizontal: 10
  },
  item: {
    // marginHorizontal: 10,
    // padding: 30,
    // marginTop: 24,
    flex: 1,
    width: "100%"
    // height: 24
  }
});

export default ListingsScreen;