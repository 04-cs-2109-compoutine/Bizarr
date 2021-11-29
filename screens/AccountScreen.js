import React, { useContext } from "react";
import { StyleSheet, View, FlatList, Image } from "react-native";
import ListItem from "../components/ListItem";
import ListItemSeparator from "../components/ListItemSeparator";
import colors from "../components/colors";
import Icon from "../components/Icon";
import Screen from "../components/Screen";
import AuthContext from "../components/context";
import Text from "../components/Text";

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
];

//we can also use useAuthState
function AccountScreen({ navigation }) {
  const {user, setUser} = useContext(AuthContext)

  return (
    <Screen style={styles.screen}>
      <View style={styles.logoContainer}>
        <Image 
          style={styles.userLogo} 
          source={require("../assets/user.png")}>
        </Image>
        <Text style={styles.tagline}>
          {user.name}
          {user.email}
        </Text>
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
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.light,
  },
  logoContainer:{
    marginTop: 15,
  },
  container: {
    marginVertical: 20,
  },
  userLogo: {
    width: 100,
    height: 100,
    alignSelf: "center",
    padding: 10,
    borderRadius: 50,
    top: 10,
  },
  tagline:{
    fontSize: 20,
    fontWeight: "400",
    paddingVertical: 20,
    alignSelf: "center",
  }
});

export default AccountScreen;
