import React, { useState, useEffect } from "react";
import { FlatList, StyleSheet} from "react-native";
import AllList from "../components/AllList";
import colors from "../components/Config/colors";
import routes from "../components/Config/routes";
import Screen from "../components/Screen";
import { useSelector, useDispatch } from 'react-redux'
import { fetchListings } from '../store/listings'

function ListingsScreen({ navigation }) {
  // const [listings, setListings] = useState([
  //   {
  //     id: 1,
  //     title: "Nice bike for sale",
  //     price: 100,
  //     image: require("../assets/bike.png"),
  //   },
  //   {
  //     id: 2,
  //     title: "Couch in great condition",
  //     price: 1000,
  //     image: require("../assets/couch.jpg"),
  //   },
  //   {
  //     id: 3,
  //     title: "Green jacket for sale",
  //     price: 100,
  //     image: require("../assets/jacket.jpg"),
  //   },
  //   {
  //     id: 4,
  //     title: "camera for sale",
  //     price: 1000,
  //     image: require("../assets/camera.png"),
  //   },
  //   {
  //     id: 5,
  //     title: "Red jacket for sale",
  //     price: 100,
  //     image: require("../assets/jacket.jpg"),
  //   },
  //   {
  //     id: 6,
  //     title: "Some books for sale",
  //     price: 1000,
  //     image: require("../assets/books.png"),
  //   },
  //   {
  //     id: 7,
  //     title: "camera for sale",
  //     price: 100,
  //     image: require("../assets/camera.png"),
  //   },
  //   {
  //     id: 8,
  //     title: "Couch in great condition",
  //     price: 1000,
  //     image: require("../assets/couch.jpg"),
  //   },
  // ])

  const listings = useSelector((state) => state.listings)
  console.log("listing screen", listings)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchListings())
  }, [])

  return (
    <Screen style={styles.screen}>
      <FlatList
        numColumns={2}
        data={listings}
        keyExtractor={(listing, index) => listing.id.toString()}
        renderItem={({ item }) => (
          <AllList
            title={item.title}
            price={"$" + item.price}
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
    padding: 10,
    backgroundColor: colors.light,
  },
});

export default ListingsScreen;
