import React, { useState, useEffect } from "react";
import { FlatList, StyleSheet} from "react-native";
import AllList from "../components/AllList";
import colors from "../components/colors";
import routes from "../components/routes";
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
        style={styles.container}
        data={listings}
        keyExtractor={(listing, index) => listing.id.toString()}
        renderItem={({ item }) => (
          <AllList
            style={styles.item}
            title={item.title}
            // subTitle={"$" + item.price}
            image={item.image}
            onPress={() => navigation.navigate(routes.LISTING_DETAILS, item)}
          />
        )}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 24,
    margin: 5,
    marginHorizontal: 10,
  },
  item: {
    marginHorizontal: 10,
    padding: 30,
    marginTop: 24,
    flex: 1,
    width: "50%",
    height: 24,
    padding: 5,
    alignItems: "center",
    marginHorizontal: 10
  }
});

export default ListingsScreen;
