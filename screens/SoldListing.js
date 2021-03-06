import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, FlatList } from "react-native";
import List from "../components/List";
import colors from "../components/Config/colors";
import routes from "../components/Config/routes";
import Screen from "../components/Screen";
import { db } from "../firebase";
import AuthContext from "../components/Config/context";
import { pixelSizeVertical } from "../components/Config/responsive";

function SoldListingScreen({ navigation }) {
  const [listings, setListings] = useState([]);
  const { user, setUser } = useContext(AuthContext);

  async function getListings() {
    try {
      const getListingsPromise = db.collection("listings").get();
      const data = await getListingsPromise;
      let allListings = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      let soldLists = allListings.filter(
        (listing) => listing.uid === user.uid && listing.sold === true
      );
      setListings(soldLists);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getListings();
  }, []);

  return (
    <Screen style={styles.screen}>
      <FlatList
        data={listings}
        keyExtractor={(listing, index) => listing.id.toString()}
        renderItem={({ item }) => (
          <List
            title={item.title}
            price={"$" + item.price}
            imageUris={item.images}
            description={item.description}
            onPress={() =>
              navigation.navigate(routes.USER_SINGLE_LISTING, item)
            }
          />
        )}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: pixelSizeVertical(20),
    backgroundColor: colors.light,
  },
});

export default SoldListingScreen;
