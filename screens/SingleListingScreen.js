import React, { useState } from "react";
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
  async function createGroup(userArray, createdBy, name, type) {
    const group = {
      createdAt: new Date(),
      createdBy,
      members: userArray,
      name,
      type,
    };
    console.log(group, "group");
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
  console.log(listing, "listing");

  return (
    <ScrollView style={styles.screen}>
      <Image style={styles.image} source={{ uri: listing.images }} />
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{listing.title}</Text>
        <View style={styles.message}>
          <Text style={styles.price}>${listing.price}</Text>

          {/* userArray, createdBy, name, type */}

          <SubmitButton
            title="Message"
            onPress={async () => {
              console.log(auth.currentUser, "auth");
              let group = null;
              // let group = await findGroup();
              //check if there is a group that already includes both the users with the same ids
              //and is type private if(!group)
              if (!group) {
                group = await createGroup(
                  [auth.currentUser.uid, listing.uid],
                  auth.currentUser.uid,
                  `${auth.currentUser.uid}-${listing.uid}`,
                  "private"
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
          image={require("../assets/user.png")}
          title="Snow White"
          subTitle="25 Listings"
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
