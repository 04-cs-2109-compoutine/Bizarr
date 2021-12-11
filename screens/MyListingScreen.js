import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, FlatList} from "react-native";
import List from "../components/List";
import colors from "../components/Config/colors";
import routes from "../components/Config/routes";
import Screen from "../components/Screen";
import {db} from "../firebase";
import AuthContext from "../components/Config/context";
import {pixelSizeVertical} from "../components/Config/responsive";

function MyListingScreen({ navigation }) {
  const [listings, setListings] = useState([]);
  const {user, setUser} = useContext(AuthContext);
  const [refreshing, setRefreshing] = useState(false);

  async function getListings() {
    try {
      const getListingsPromise = db.collection("listings").get();
      const data = await getListingsPromise;
      let allListings = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      let userLists = allListings.filter((listing) => listing.uid === user.uid);
      setListings(userLists);
    } catch (e) {
      console.log(e);
    }
  }

  console.log("listing", listings);
  useEffect(() => {
    getListings();
  }, [])

  const handleRefresh = async () => {
    setRefreshing(true);
    getListings();
    setRefreshing(false);
  };

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
        refreshing={refreshing}
        onRefresh={handleRefresh}
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

export default MyListingScreen;
