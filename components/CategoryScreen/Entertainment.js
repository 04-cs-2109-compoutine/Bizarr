import React, { useState, useEffect, useContext } from "react";
import { FlatList, StyleSheet, Text } from "react-native";
import AllList from "../AllList";
import colors from "../Config/colors";
import routes from "../Config/routes";
import Screen from "../Screen";
import { db } from "../../firebase";
import { SearchBar } from "react-native-elements";
import AuthContext from "../Config/context";

function Entertainment({ navigation }) {
  const [listings, setListings] = useState([]);
  const [filteredLists, setFilteredLists] = useState([]);
  const [search, setSearch] = useState();
  const {user, setUser} = useContext(AuthContext);

  async function getFurniture() {
    try {
      const getListingsPromise = db.collection("listings").get()
      const data = await getListingsPromise
      let allListings = data.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      let userLists = allListings.filter(listing => listing.uid !== user.uid && listing.sold === false && listing.category === 'Entertainment')
      setListings(userLists)
      setFilteredLists(userLists)
    } catch(e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getFurniture();
  }, []);

  const searchFilterFunction = (text) => {
    if (text) {
      const newData = listings.filter(function (item) {
        const itemData = item.description
          ? item.description.toUpperCase()
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
            title={item.title}
            price={"$" + item.price}
            imageUris={item.images}
            description={item.description}
            onRowPress={() => navigation.navigate(routes.LISTING_DETAILS, item)}
            onLikePost={(_id) =>
              setFilteredLists(() => {
              return filteredLists.map((list) => {
                if (list.id === _id) {
                  return { ...list, isLiked: !list.isLiked };
                }
                return list;
              });
            })
          }
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

export default Entertainment;
