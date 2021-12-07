import React, { useState, useEffect } from "react";
import { FlatList, StyleSheet } from "react-native";
import firebase from "firebase";

import ListItem from "../components/ListItem";
import ListItemDeleteAction from "../components/ListItemDeleteAction";
import Screen from "../components/Screen";
import colors from "../components/Config/colors";
import ListItemSeparator from "../components/ListItemSeparator";

import { auth, db } from "../firebase";

function MessageScreen({ navigation }) {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    if (auth.currentUser.uid) {
      fetchGroupByUserID(auth.currentUser.uid);
    }
  }, []);

  const fetchGroupByUserID = async (uid) => {
    const groups = await new Promise((resolve, reject) => {
      try {
        const groupRef = db.collection("group");
        groupRef
          .where("members", "array-contains", uid)
          .onSnapshot((querySnapshot) => {
            let allGroups = [];
            querySnapshot.forEach((doc) => {
              const data = doc.data();
              data.id = doc.id;
              allGroups.push(data);
            });
            setGroups(allGroups);
            resolve(allGroups);
          });
      } catch (error) {
        console.log(error);
        resolve([]);
      }
    });
    return new Promise(async (resolve) => {
      const newArr = [];
      for (const group of groups) {
        // lookup on users per userid
        for (const user of group.members) {
          // lookup on user
          if (user !== auth.currentUser.uid) {
            const res = await getUser(user);
            if (group.name === auth.currentUser.displayName) {
              group.name = res.displayName;
            }
            group.photoURL = res.photoURL;
          }
        }
        newArr.push(group);
      }
      setGroups(newArr);
      resolve(newArr);
    });
  };

  const getUser = async (uid) => {
    return new Promise((resolve, reject) => {
      try {
        const userRef = db.collection("users");
        userRef
          .where(firebase.firestore.FieldPath.documentId(), "==", uid)
          .get()
          .then((snapShot) => {
            if (snapShot.docs.length) {
              resolve(snapShot.docs[0].data());
            } else {
              resolve("Unknown");
            }
          });
      } catch (error) {
        reject(error);
      }
    });
  };

  //delete the message
  const handleDelete = (message) => {
    setGroups(groups.filter((m) => m.id !== message.id));
  };

  return (
    <Screen>
      <FlatList
        style={styles.list}
        data={groups}
        keyExtractor={(group) => group.id.toString()}
        renderItem={({ item }) => (
          <ListItem
            title={item.name}
            subtitle={JSON.stringify(item, null, 4)}
            image={item.photoURL}
            onPress={() =>
              navigation.navigate("SingleMessage", { group: item })
            }
            renderRightActions={() => (
              <ListItemDeleteAction onPress={() => handleDelete(item)} />
            )}
          />
        )}
        ItemSeparatorComponent={ListItemSeparator}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  list: {
    backgroundColor: colors.main,
  },
});

export default MessageScreen;
