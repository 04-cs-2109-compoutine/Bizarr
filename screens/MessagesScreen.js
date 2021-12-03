import React, { useState, useEffect } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import ListItem from "../components/ListItem";
import ListItemDeleteAction from "../components/ListItemDeleteAction";

import Screen from "../components/Screen";
import colors from "../components/Config/colors";
import ListItemSeparator from "../components/ListItemSeparator";

import { auth, db } from "../firebase";

function MessageScreen({ navigation, route }) {
  const [groups, setGroups] = useState([]);

  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (auth.currentUser.uid) {
      console.log(auth.currentUser.uid, "current user");
      fetchGroupByUserID(auth.currentUser.uid);
    }
  }, []);

  function fetchGroupByUserID(uid) {
    return new Promise((resolve, reject) => {
      console.log(uid, "uid");
      try {
        const groupRef = db.collection("group");
        groupRef
          .where("members", "array-contains", uid)
          .onSnapshot((querySnapshot) => {
            const allGroups = [];
            querySnapshot.forEach((doc) => {
              const data = doc.data();
              data.id = doc.id;
              allGroups.push(data);
            });
            console.log(allGroups, "groups in all message screen");
            setGroups(allGroups);
            resolve(allGroups);
          });
      } catch (error) {
        console.log(error);
        resolve([]);
      }
    });
  }

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
            imageUrl={
              "https://lh3.googleusercontent.com/proxy/Y7j6CHreamAbM4a47JR29UEvMeQs0gYPbgpbifv_V5WLCyFyLTLVmQSfAHEHmcfvIWr7ACvgSDXU8zOyIHBTXWWw8Tvlchk"
            }
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
