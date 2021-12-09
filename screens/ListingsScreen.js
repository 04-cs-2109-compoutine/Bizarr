import React, { useState, useEffect, useContext } from "react";
import { FlatList, StyleSheet, Text, Animated } from "react-native";
import AllList from "../components/AllList";
import colors from "../components/Config/colors";
import routes from "../components/Config/routes";
import Screen from "../components/Screen";
import { db } from "../firebase";
import { SearchBar } from "react-native-elements";
import AuthContext from "../components/Config/context";

function ListingsScreen({ navigation }) {
  const [listings, setListings] = useState([]);
  const [filteredLists, setFilteredLists] = useState([]);
  const [search, setSearch] = useState();
  const { user, setUser } = useContext(AuthContext);
  const [favoriteList, setFavoriteList] = useState([]);

  console.log(favoriteList)
  // console.log(user)

  async function readAllListing() {
    try {
      const getListingsPromise = db.collection("listings").get();
      const data = await getListingsPromise;
      let allListings = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      let userLists = allListings.filter(
        (listing) => listing.uid !== user.uid && listing.sold === false
      );
      setListings(userLists);
      setFilteredLists(userLists);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    readAllListing();
  }, []);

  const updateUser = async (favoriteList) => {
    await db.collection("users").doc(user.uid).update({
      likedItems: favoriteList
    })
    .catch(function (error) {
      alert(error.message);
    });
  }

  const searchFilterFunction = (text) => {
    if (text) {
      const newData = listings.filter(function (item) {
        const itemData = item.title
          ? item.title.toUpperCase()
          : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredLists(newData);
      setSearch(text);
    } else {
      setFilteredLists(listings);
      setSearch(text);
    }
  };

  const onFavorite = listing => {
    setFavoriteList([...favoriteList, listing]);
    updateUser(favoriteList);
  };

  const onRemoveFavorite = listing => {
    const filteredList = favoriteList.filter(
      item => item.id !== listing.id
    );
    setFavoriteList(filteredList);
    updateUser(favoriteList);
  };

   const ifExists = listing => {
    if (favoriteList.filter(item => item.id === listing.id).length > 0) {
      return true;
    }
    return false;
  };

  return filteredLists instanceof Object ? (
    <Screen style={styles.screen}>
      <SearchBar
        placeholder="Type Here..."
        onChangeText={(text) => searchFilterFunction(text)}
        value={search}
        showCancel
        lightTheme
      />
      <FlatList
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        data={filteredLists}
        keyExtractor={(listing, index) => listing.id.toString()}
        renderItem={({ item }) => (
          <AllList
            price={"$" + item.price}
            imageUris={item.images}
            onRowPress={() => navigation.navigate(routes.LISTING_DETAILS, item)}
            ifExists={ifExists(item)}
            onPress={()=> 
              ifExists(item) ?  onRemoveFavorite(item) : onFavorite(item)}
          />
        )}
      />
    </Screen>
  ) : (
    <Text>Please wait...</Text>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 10,
    backgroundColor: colors.light,
  },
});

export default ListingsScreen;
