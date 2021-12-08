import React, { useState, useRef, useContext, useEffect } from "react";
import { StyleSheet, View, Dimensions,} from "react-native";
import AllHorizontal from "./AllHorizontal";
import {FlatList,ScrollView as GestureHandlerScrollView,} from "react-native-gesture-handler";
import { Screen } from "react-native-screens";
import routes from "./Config/routes";

const { width, height } = Dimensions.get("window");

const HorizontalListing = ({ listings, navigation}) => {

return(
    <View 
      horizontal 
      scrollEnabled 
      contentContainerStyle={styles.contentContainer}
    >
      <FlatList
        data={listings}
        numColumns={2}
        keyExtractor={(item, index) => item.id.toString()}
        renderItem={({ item }) => (
          <AllHorizontal
            title={item.title}
            price={"$" + item.price}
            imageUris={item.images}
            onRowPress={()=> navigation.navigate(routes.HOME_SINGLE_LISTING, item)}
          />
        )}
      />
    </View>
  )
}


const styles = StyleSheet.create({
  contentContainer: {
    width: '100%',
    height: height,
    flexDirection: "row",
    flex: 1,
    marginBottom: 20,
  },
});

export default HorizontalListing;
