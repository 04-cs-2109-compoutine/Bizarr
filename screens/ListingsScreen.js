import React, { useState, useEffect } from "react";
import { FlatList, StyleSheet, Text} from "react-native";
import AllList from "../components/AllList";
import colors from "../components/Config/colors";
import routes from "../components/Config/routes";
import Screen from "../components/Screen";
import { db } from '../firebase'

function ListingsScreen({ navigation }) {
  const [listings, setListings] = useState();
  async function readAllListing() {
    try {
      const getListingsPromise = db.collection("listings").get()
      const data = await getListingsPromise
      setListings({
        listings: data.docs.map(doc => ({ ...doc.data(), id: doc.id }))
      })
    } catch(e) {
      console.log(e);
    }
  }
  useEffect(() => {
    readAllListing();
  }, [])

    return listings instanceof Object ? (
      <Screen style={styles.screen}>
        <FlatList
          numColumns={2}
          data={listings["listings"]}
          keyExtractor={(listing, index) => listing.id.toString()}
          renderItem={({ item }) => (
            <AllList
              title={item.title}
              price={"$" + item.price}
              image={item.images}
              onPress={() => navigation.navigate(routes.LISTING_DETAILS, item)}
            />
          )}
        />
      </Screen>
    ) : <Text>Please wait...</Text>
}

const styles = StyleSheet.create({
  screen: {
    padding: 10,
    backgroundColor: colors.light,
  },
});

export default ListingsScreen;
