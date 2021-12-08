import React, { useState, useEffect,useContext} from "react";
import { StyleSheet, View, FlatList, Image } from "react-native";
import ListItem from "../components/ListItem";
import ListItemSeparator from "../components/ListItemSeparator";
import colors from "../components/Config/colors";
import Icon from "../components/Config/Icon";
import Screen from "../components/Screen";
import Text from "../components/Config/Text";
import { db } from "../firebase";
import AuthContext from "../components/Config/context";

const menuItems = [
  {
    title: "My Listings",
    icon: {
      name: "format-list-bulleted",
      backgroundColor: colors.primary,
    },
    targetScreen: "My Listings",
  },
  {
    title: "Account Details",
    icon: {
      name: "account",
      backgroundColor: colors.danger,
    },
    targetScreen: "Account Details",
  },
  {
    title: "Sold History",
    icon: {
      name: "tag-heart",
      backgroundColor: "#CAB8FF",
    },
    targetScreen: "Sold Listing Screen",
  },
  {
    title: "Saved",
    icon: {
      name: "heart-outline",
      backgroundColor: "#FFADAD"
    },
    targetScreen: "Saved Items",
  },
];

function AccountScreen({ navigation }) {
  const [userName, setUsername] = useState({});
  const {user, setUser} = useContext(AuthContext);
  const id = user.uid;
  async function getUser() {
    try {
      await db.collection("users").doc(id).get().then(
        snapshot => setUsername(snapshot.data())
      )
    } catch(e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getUser();
  }, [])

  return (
    <Screen style={styles.screen}>
      <View style={styles.logoContainer}>
        <Image
          style={styles.userLogo}
          source={{uri: userName.photoURL}}>
        </Image>
        <Text style={styles.tagline}>{userName.displayName}</Text>
      </View>
      <View style={styles.container}>
        <FlatList
          data={menuItems}
          keyExtractor={(menuItem) => menuItem.title}
          ItemSeparatorComponent={ListItemSeparator}
          renderItem={({ item }) => (
            <ListItem
              title={item.title}
              IconComponent={
                <Icon
                  name={item.icon.name}
                  backgroundColor={item.icon.backgroundColor}
                />
              }
              onPress={() => navigation.navigate(item.targetScreen)}
            />
          )}
        />
      </View>
      <ListItem
        title="Log Out"
        IconComponent={<Icon name="logout" backgroundColor="#ffe66d" />}
        onPress={() => setUser(null)}
      />
    </Screen>
  )
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.main,
  },
  logoContainer:{
    marginTop: 15,
  },
  container: {
    marginVertical: 20,
  },
  userLogo: {
    width: 90,
    height: 90,
    alignSelf: "center",
    padding: 10,
    borderRadius: 50,
    top: 10,
    marginBottom: 20
  },
  tagline:{
    fontSize: 20,
    fontWeight: "500",
    alignSelf: "center",
    color: "white",
    paddingVertical: 5
  }
});

export default AccountScreen;
