import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import colors from "../components/Config/colors";
import { SliderBox } from "react-native-image-slider-box";
import LoadingMap from "../components/LocationMap";
import Text from "../components/Config/Text";
import SubmitButton from "../components/Button/SubmitButton";
import routes from "../components/Config/routes";
import { auth, db } from "../firebase";
import UserListItem from "../components/UserListItem";
import { widthPixel, heightPixel, fontPixel, pixelSizeVertical} from "../components/Config/responsive"

function SingleListingScreen({ route, navigation }) {
  const listing = route.params;
  const [userName, setUsername] = useState({});
  const [listings, setListings] = useState([]);
  const [groups, setGroups] = useState([]);
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
      let userLists = allListings.filter((listing) => listing.uid === id);
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

  //group functions
  async function createGroup(userArray, createdBy, name, type, listingId) {
    const group = {
      createdAt: new Date(),
      createdBy,
      members: userArray,
      name,
      type,
      listingId: parseInt(listingId),
    };

    return new Promise((resolve, reject) => {
      db.collection("group")
        .add(group)
        .then(function (docRef) {
          group.id = docRef.id;
          fetchGroupByUserID(auth.uid);
          resolve(group);
        })
        .catch(function (error) {
          reject(error);
        });
    });
  }
  async function findGroup(userArray) {
    return new Promise((resolve, reject) => {
      const groupRef = db.collection("group");
      try {
        groupRef
          .where("members", "array-contains", userArray[0])
          .get()
          .then((querySnapshot) => {
            if (!querySnapshot.empty) {
              const groups = querySnapshot.docs.map((doc) => {
                const group = doc.data();
                group.id = doc.id;
                return group;
              });
              const filteredGroups = groups.filter((group) =>
                group.members.includes(userArray[1])
              );
              resolve(filteredGroups[0]);
            } else {
              resolve(null);
            }
          });
      } catch (e) {
        console.log(e);
        resolve(null);
      }
    });
  }

  function fetchGroupByUserID(uid) {
    return new Promise((resolve, reject) => {
      const groupRef = db.collection("group");
      groupRef
        .where("members", "array-contains", uid)
        .onSnapshot((querySnapshot) => {
          const allGroups = [];
          querySnapshot.forEach((doc) => {
            const data = doc.data();
            data.id = doc.id;
            if (data.recentMessage) allGroups.push(data);
          });
          groups = setGroups(allGroups);
        });
    });
  }

  return (
    <ScrollView style={styles.screen}>
      <SliderBox images={listing.images} style={styles.image} />
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{listing.title}</Text>
        <Text style={styles.description}>{listing.description}</Text>
        <Text style={styles.price}>${listing.price}</Text>
      </View>

      <View style={styles.sellerContainer}>
        <UserListItem
          image={userName.photoURL}
          title={userName.displayName}
          subTitle={listings.length.toString()}
          onPress={() => navigation.navigate(routes.SELLER_LISTINGS, listings)}
        />
      </View>
      <View style={styles.map}>
        <LoadingMap
          latitude={listing.location.latitude}
          longitude={listing.location.longitude}
        />
      </View>
      <View style={styles.submitButton}>
        <SubmitButton
          title="Message"
          onPress={async () => {
            let group = await findGroup([auth.currentUser.uid, listing.uid]);
            if (!group) {
              group = await createGroup(
                [auth.currentUser.uid, listing.uid],
                auth.currentUser.uid,
                `${auth.currentUser.displayName}`,
                "listing",
                listing.uid
              );
            }
            navigation.navigate(routes.SINGLE_MESSAGE, {
              group,
            });
          }}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: pixelSizeVertical(10),
    backgroundColor: colors.white,
  },
  detailsContainer: {
    padding: pixelSizeVertical(10),
  },
  image: {
    width: "95%",
    height: heightPixel(350),
  },
  price: {
    color: colors.secondary,
    fontWeight: "bold",
    fontSize: fontPixel(25),
    marginVertical: pixelSizeVertical(10),
  },
  title: {
    fontSize: fontPixel(26),
    fontWeight: "500",
  },
  description: {
    marginTop: pixelSizeVertical(10),
    fontSize: fontPixel(15.5),
  },
  sellerContainer: {
    marginBottom: pixelSizeVertical(10),
  },

  submitButton: {
    width: widthPixel(650),

    marginLeft: "20%",

    alignContent: 'center',

    marginBottom: pixelSizeVertical(300),
    flexDirection: "row",
    paddingTop: pixelSizeVertical(260),
  },
});

export default SingleListingScreen;
