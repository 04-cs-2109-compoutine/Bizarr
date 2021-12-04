import React, { useState, useEffect } from "react";
import { View, StyleSheet, Image, ScrollView } from "react-native";
import colors from "../components/Config/colors";
import ListItem from "../components/ListItem";
import LoadingMap from "../components/LocationMap";
import Text from "../components/Config/Text";
import SubmitButton from "../components/Button/SubmitButton";
import routes from "../components/Config/routes";
import { auth, db } from "../firebase";

function SingleListingScreen({ route, navigation }) {
  const [groups, setGroups] = useState([]);
  const listing = route.params;
  const [userName, setUsername] = useState("");
  const [listings, setListings] = useState([]);

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
      //can insert more listing here by creating object
    };
    // auth.currentUser.uid, listing.uid
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
      } catch (error) {
        console.log(error);
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
      <Image style={styles.image} source={{ uri: listing.images }} />
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{listing.title}</Text>
        <View style={styles.message}>
          <Text style={styles.price}>${listing.price}</Text>

          <SubmitButton
            title="Message"
            onPress={async () => {
              let group = await findGroup([auth.currentUser.uid, listing.uid]);

              if (!group) {
                group = await createGroup(
                  [auth.currentUser.uid, listing.uid],
                  auth.currentUser.uid,
                  `${listing.title} - ${auth.currentUser.displayName}`,
                  "listing",
                  listing.id
                );
              }
              navigation.navigate(routes.SINGLE_MESSAGE, {
                group,
              });
            }}
          />
        </View>
      </View>

      <View style={styles.sellerContainer}>
        <ListItem
          image={userName.photoURL}
          title={userName.displayName}
          // subTitle={listings.length.toString()}
          onPress={() => navigation.navigate(routes.SELLER_LISTINGS, listings)}
        />
      </View>
      <View>
        <LoadingMap
          latitude={listing.location.latitude}
          longitude={listing.location.longitude}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 10,
    backgroundColor: colors.white,
  },
  detailsContainer: {
    padding: 10,
  },
  image: {
    width: "100%",
    height: 300,
  },
  price: {
    color: colors.secondary,
    fontWeight: "bold",
    fontSize: 20,
    marginVertical: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "500",
  },
  sellerContainer: {
    marginBottom: 10,
  },
  message: {
    flex: 2,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
  },
});

export default SingleListingScreen;
