import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SingleListingScreen from "../screens/SingleListingScreen";
import ListingsScreen from "../screens/ListingsScreen";
import SingleMessageScreen from "../screens/SingleMessageScreen";
import SellerListingScreen from "../screens/SellerListingScreen";

const Stack = createNativeStackNavigator();

const ListNavigator = () => (
  //modal let screen pop from the bottom, screen options make the detail page has no title
  <Stack.Navigator mode="modal" >
    <Stack.Screen name="Listings" options={{ headerShown: false }} component={ListingsScreen}/>
    <Stack.Screen name="Listing Details" component={SingleListingScreen} options={{headerTitle: ""}}/>
    <Stack.Screen name="SingleMessage" component={SingleMessageScreen} options={{headerTitle: "Chat"}}/>
    <Stack.Screen name="Seller Listings" component={SellerListingScreen} options={{headerTitle: ""}}/>
  </Stack.Navigator>
)

export default ListNavigator;