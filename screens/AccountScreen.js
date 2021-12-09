import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, View, FlatList, Image } from "react-native";
import ListItem from "../components/ListItem";
import ListItemSeparator from "../components/ListItemSeparator";
import colors from "../components/Config/colors";
import Icon from "../components/Config/Icon";
import Screen from "../components/Screen";
import Text from "../components/Config/Text";
import { db } from "../firebase";
import AuthContext from "../components/Config/context";
import {
  widthPixel,
  heightPixel,
  fontPixel,
  pixelSizeVertical,
  pixelSizeHorizontal,
} from "../components/Config/responsive";

const menuItems = [
  {
    title: "My Listings",
    icon: {
      name: "format-list-bulleted",
      backgroundColor: colors.main,
    },
    targetScreen: "My Listings",
  },
  {
    title: "Account Details",
    icon: {
      name: "account",
      backgroundColor: colors.main,
    },
    targetScreen: "Account Details",
  },
  {
    title: "Sold History",
    icon: {
      name: "tag-heart",
      backgroundColor: colors.main,
    },
    targetScreen: "Sold Listing Screen",
  },
  {
    title: "Saved",
    icon: {
      name: "heart-outline",
      backgroundColor: colors.main,
    },
    targetScreen: "Saved Items",
  },
];

function AccountScreen({ navigation }) {
  const [userName, setUsername] = useState({});
  const { user, setUser } = useContext(AuthContext);
  const id = user.uid;
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

  useEffect(() => {
    getUser();
  }, []);

  return (
    <Screen style={styles.screen}>
      <View style={styles.logoContainer}>
        <Image
          style={styles.userLogo}
          source={{ uri: userName.photoURL }}
        ></Image>
        <Text style={styles.tagline}>{userName.displayName}</Text>
      </View>
      <View>
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
        IconComponent={<Icon name="logout" backgroundColor={colors.main} />}
        onPress={() => setUser(null)}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.primary,
  },
  logoContainer: {
    marginTop: pixelSizeVertical(15),
  },
  userLogo: {
    width: widthPixel(90),
    height: heightPixel(90),
    alignSelf: "center",
    padding: pixelSizeVertical(10),
    borderRadius: 50,
    top: pixelSizeVertical(10),
    marginBottom: pixelSizeVertical(20),
  },
  tagline: {
    fontSize: fontPixel(20),
    fontWeight: "500",
    alignSelf: "center",
    color: "black",
    paddingVertical: pixelSizeVertical(5),
  },
});

export default AccountScreen;
