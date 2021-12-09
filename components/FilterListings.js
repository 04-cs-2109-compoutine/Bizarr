import React, { useState } from 'core-js/library/fn/reflect/es7/metadata';
import {
  View,
  StyleSheet,
  TextInput,
  Picker,
  Alert,
  Modal,
  Text,
  Pressable,
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback,
  Dimensions, 
  PixelRatio
} from "react-native";

import { db } from '../firebase';

const FilterListings = () => {
  [listings, setListings] = useState([])
  async function readAllListingAndSortByPrice() {
    try {
      const getListingsPromise = db.collection("listings").get()
      const data = await getListingsPromise
      let allListings = data.docs.map(doc => ({ ...doc.data(), id: doc.id, price: Number(doc.price)}));
      let userLists = allListings.filter(listing => listing.uid !== user.uid && listing.sold === false)
      let sortList = userLists.sort((a, b) => b.price - a.price)
      setListings(sortList)
    } catch(e) {
      console.log(e);
    }
  }

return(
<Modal visible={false}>
  <View style={StyleSheet.modalContent}>

  </View>
</Modal>
)
}

export default FilterListings