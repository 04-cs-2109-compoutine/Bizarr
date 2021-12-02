import React, {useContext, useEffect, useState} from 'react';
import { StyleSheet, FlatList, Text} from 'react-native';
import List from "../components/List";
import colors from "../components/Config/colors";
import routes from "../components/Config/routes";
import Screen from "../components/Screen";

function SellerListingScreen({navigation, route}) {
  const listings = route.params
  console.log(listings)

  return (
    <Screen style={styles.screen}>
      <FlatList
        data={listings}
        keyExtractor={(listing, index) => listing.id.toString()}
        renderItem={({ item }) => (
          <List
            title={item.title}
            subTitle={"$" + item.price}
            image={item.images}
            onPress={() => navigation.navigate(routes.LISTING_DETAILS, item)}
          />
        )}
      />
    </Screen>
  )
}

const styles = StyleSheet.create({
  screen: {
    padding: 20,
    backgroundColor: colors.light,
  },
});

export default SellerListingScreen;