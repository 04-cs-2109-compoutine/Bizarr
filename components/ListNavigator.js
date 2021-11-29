import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SingleListingScreen from "../screens/SingleListingScreen";
import ListingsScreen from "../screens/ListingsScreen"

const Stack = createNativeStackNavigator();

const ListNavigator = () => (
  //modal let screen pop from the bottom, screen options make the detail page has no title
  <Stack.Navigator mode="modal" >
    <Stack.Screen name="Listings" component={ListingsScreen}/>
    <Stack.Screen name="Listing Details" component={SingleListingScreen} />
  </Stack.Navigator>
)

export default ListNavigator;