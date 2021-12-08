import React, {useState, useRef, useContext, useEffect}from 'react';
import AuthContext from './Config/context';
import { StyleSheet, Text ,View, SectionList, SafeAreaView, Image, FlatList, ScrollView } from 'react-native'
import AllHorizontal from './AllHorizontal';
import { db } from "../firebase"

const HorizontalListing = () => {
  const scrollView = useRef()
  const [listings, setListings] = useState([]);
  const [filteredLists, setFilteredLists] = useState([]);
  const [search, setSearch] = useState();
  //const [liked, setLiked] = useState(false);
  const {user, setUser} = useContext(AuthContext);
  async function readAllListing() {
    try {
      const getListingsPromise = db.collection("listings").get()
      const data = await getListingsPromise
      let allListings = data.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      let userLists = allListings.filter(listing => listing.uid !== user.uid && listing.sold === false)
      setListings(userLists)
      setFilteredLists(userLists)
    } catch(e) {
      console.log(e);
    }
  }

  useEffect(() => {
    readAllListing();
  }, []);

return(
  <View style={styles.container}>
    <ScrollView
    horizontal 
    ref = {scrollView}
    onContentSizeChange={() => scrollView.current.scrollToEnd()}
    >
    <FlatList
                data={listings}
                keyExtractor={(item, index) => item.id.toString() }
                renderItem={
                  ({ item }) => 
                  (
                  <AllHorizontal
                  title={item.title}
                  price={"$" + item.price}
                  imageUris={item.images}

                  />
                )}
    />
    </ScrollView>
  </View>
)

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
  },
  sectionHeader: {
    fontWeight: '800',
    fontSize: 16,
    color: 'black',
    marginTop: 20,
    marginLeft: 30,
    marginBottom: 5,
  },
  item: {
    margin: 10,
    paddingRight: 10,
    backgroundColor: 'green',
  },
  itemPhoto: {
    width: 160,
    height: 160,
  },
  itemText: {
    color: 'rgba(255, 255, 255, 0.5)',
    marginTop: 5,
  },
});

export default HorizontalListing;