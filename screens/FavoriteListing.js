import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, FlatList } from "react-native";
import List from "../components/List";
import colors from "../components/Config/colors";
import routes from "../components/Config/routes";
import Screen from "../components/Screen";
import { db } from "../firebase";
import AuthContext from "../components/Config/context";

function FavoriteListing({ navigation }) {
  const [favoriteLists, setfavoriteLists] = useState([]);
  const { user, setUser } = useContext(AuthContext);

  console.log(favoriteLists)

  async function getfavoriteListings() {
    try {
     await db.collection("users").doc(user.uid).get().then((snapshot) => setfavoriteLists(snapshot.data().likedItems));
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getfavoriteListings();
  }, []);

  return (
    <Screen style={styles.screen}>
      <FlatList
        data={favoriteLists}
        keyExtractor={(listing, index) => listing.id.toString()}
        renderItem={({ item }) => (
          <List
            title={item.title}
            price={"$" + item.price}
            imageUris={item.images}
            description={item.description}
            onPress={() =>
              navigation.navigate(routes. LISTING_DETAILS, item)
            }
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

export default FavoriteListing;
