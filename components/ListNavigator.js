import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SingleListingScreen from "../screens/SingleListingScreen";
import ListingsScreen from "../screens/ListingsScreen"

const Stack = createNativeStackNavigator();

const ListNavigator = () => (
  <Stack.Navigator mode="modal" screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Listings" component={ListingsScreen}/>
    <Stack.Screen name="ListingDetails" component={SingleListingScreen} />
  </Stack.Navigator>
)

export default ListNavigator;