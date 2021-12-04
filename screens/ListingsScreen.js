import React, { useState, useEffect, useContext } from "react";
import { FlatList, StyleSheet, Text} from "react-native";
import AllList from "../components/AllList";
import colors from "../components/Config/colors";
import routes from "../components/Config/routes";
import Screen from "../components/Screen";
import { db } from '../firebase';
import { SearchBar } from "react-native-elements";
import AuthContext from "../components/Config/context";

function ListingsScreen({ navigation }) {
  const [listings, setListings] = useState([]);
  const [search, setSearch] = useState();
  const {user, setUser} = useContext(AuthContext);

  async function readAllListing() {
    try {
      const getListingsPromise = db.collection("listings").get()
      const data = await getListingsPromise
      let allListings = data.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      let userLists = allListings.filter(listing => listing.uid !== user.uid)
      setListings(userLists)
    } catch(e) {
      console.log(e);
    }
  }
  useEffect(() => {
    readAllListing();
  }, [])

  const updateSearch = (search)=>{
    setSearch({ search });
  }

  return listings instanceof Object ? (
    <Screen style={styles.screen}>
      <SearchBar
        placeholder="Type Here..."
        onChangeText={updateSearch}
        value={search}
        showCancel
        lightTheme
      />
      <FlatList
        numColumns={2}
        data={listings}
        keyExtractor={(listing, index) => listing.id.toString()}
        renderItem={({ item }) => (
          <AllList
            title={item.title}
            price={"$" + item.price}
            imageUris={item.images}
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
