import React, { useState, useEffect, useContext } from "react";
import { FlatList, StyleSheet, Text, Image, TouchableOpacity, View } from "react-native";
import AllList from "../components/AllList";
import colors from "../components/Config/colors";
import routes from "../components/Config/routes";
import Screen from "../components/Screen";
import { db } from "../firebase";
import { SearchBar } from "react-native-elements";
import AuthContext from "../components/Config/context";
import { widthPixel, heightPixel, fontPixel, pixelSizeVertical, pixelSizeHorizontal} from "../components/Config/responsive"

function ListingsScreen({ navigation }) {
  const [listings, setListings] = useState([]);
  const [descending, setDescending] = useState([])
  const [filteredLists, setFilteredLists] = useState([]);
  const [search, setSearch] = useState();
  const { user, setUser } = useContext(AuthContext);
  const [favoriteList, setFavoriteList] = useState([]);

  //console.log(favoriteList)
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

  async function readAllListingsAndSortByPrice() {
    try {
      const getListingsPromise = db.collection("listings").get()
      const data = await getListingsPromise
      let allListings = data.docs.map(doc => ({ ...doc.data(), id: doc.id}));
      let userLists = allListings.filter(listing => listing.uid !== user.uid && listing.sold === false)
      let sortByPriceList = userLists.map(listing => ({...listing, price: parseInt(listing.price)}))
        .sort(function(a, b){ return a.price - b.price})
      setFilteredLists(sortByPriceList)
    } catch(e) {
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
      <View>
        <SearchBar
          placeholder="Type Here..."
          onChangeText={(text) => searchFilterFunction(text)}
          value={search}
          showCancel
          lightTheme
        />
        <TouchableOpacity style={styles.iconContainer} activeOpacity = { .5 } onPress={readAllListingsAndSortByPrice}>
          <Image source={require('../assets/baseline_filter_list_black_24dp.png')} style={styles.icon}/>
        </TouchableOpacity>
        </View>
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
    padding: pixelSizeVertical(10),
    backgroundColor: colors.light,
  },
  // searchBarContainer:{
  //   flex: 1,
  //   flexDirection: 'row',
  //   justifyContent: 'center',
  //   margin: 100
  // },
  icon:{
    marginLeft: pixelSizeHorizontal(345),
    marginBottom: pixelSizeVertical(60),
  },
  iconContainer:{
    height: heightPixel(1), 
    width: widthPixel(1), 
    paddingBottom: pixelSizeVertical(40)
  }

});

export default ListingsScreen;
