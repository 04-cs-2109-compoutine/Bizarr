import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import colors from "../components/Config/colors";
import LoadingMap from "../components/LocationMap";
import Text from "../components/Config/Text";
import SubmitButton from "../components/Button/SubmitButton";
import routes from "../components/Config/routes";
import { db } from "../firebase";
import { SliderBox } from "react-native-image-slider-box";
import UserListItem from "../components/UserListItem";
import { widthPixel, heightPixel, fontPixel, pixelSizeVertical, pixelSizeHorizontal} from "../components/Config/responsive"


function UserSingleListingScreen({ route, navigation }) {
  const listing = route.params;
  const [userName, setUsername] = useState("");
  const [listings, setListings] = useState([]);
  const [sold, setSold] = useState(listing.sold);

  const id = listing.uid;

  async function getUser() {
    try {
      await db
        .collection("users")
        .doc(id)
        .get()
        .then((snapshot) => setUsername(snapshot.data()));
    } catch (e) {
      console.log(e);
    }
  }

  async function getListings() {
    try {
      const getListingsPromise = db.collection("listings").get();
      const data = await getListingsPromise;
      let allListings = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      let userLists = allListings.filter((listing) => listing.uid === id && listing.sold === false);
      setListings(userLists);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getListings();
  }, []);

  useEffect(() => {
    getUser();
  }, []);

  async function handleChange() {
    try{
      setSold(!sold);
      // console.log(listing)
      await db.collection("listings").doc(listing.id).update({sold: !sold});
    }catch(e){
      console.log(e)
    }
  }

  const handleDelete = async() => {
    try {
      await db.collection('listings')
        .doc(listing.id)
        .delete();
      setListings(listings.filter((listing) => listing.id !== id));
      navigation.navigate(routes.MY_ACCOUNT)
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <ScrollView style={styles.container}>
      <SliderBox
        images={listing.images}
        style={styles.image}
        dotColor={colors.primary}
      />
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{listing.title}</Text>
        <Text style={styles.description}>{listing.description}</Text>
        <View style={styles.message}>
          <Text style={styles.price}>${listing.price}</Text>
          <SubmitButton
            title={sold ? "Sold" : "Available"}
            onPress={() => handleChange()}
          />
        </View>
      </View>

      <View style={styles.sellerContainer}>
        <UserListItem
          image={userName.photoURL}
          title={userName.displayName}
          subTitle={listings.length.toString()}
          onPress={() => navigation.navigate(routes.SELLER_LISTINGS, listings)}
        />
      </View>
      <View >
        <LoadingMap
          latitude={listing.location.latitude}
          longitude={listing.location.longitude}
        />
      </View>
      <View style={styles.delete}>
        <SubmitButton
          title={"Delete"}
          onPress={() => handleDelete()}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: pixelSizeVertical(10),
    backgroundColor: colors.white,
    marginBottom: pixelSizeVertical(10),
  },
  detailsContainer: {
    padding: pixelSizeVertical(10),
  },
  image: {
    width: "95%",
    height: heightPixel(300),
  },
  price: {
    color: colors.secondary,
    fontWeight: "bold",
    fontSize: fontPixel(20),
    marginVertical: pixelSizeVertical(10),
  },
  title: {
    fontSize: fontPixel(24),
    fontWeight: "500",
  },
  description: {
    marginTop: pixelSizeVertical(10),
  },
  sellerContainer: {
    marginBottom: pixelSizeVertical(10),
  },
  message: {
    flex: 2,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
  },
  delete:{
    marginTop: pixelSizeVertical(280),
    paddingBottom: pixelSizeVertical(40),
    alignItems: 'center'
  }
});

export default UserSingleListingScreen;
