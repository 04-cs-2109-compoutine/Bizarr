import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AccountScreen from "../screens/AccountScreen";
import AccountDetailsScreen from "../screens/AccountDetailsScreen";
import MyListingScreen from "../screens/MyListingScreen"

const Stack = createNativeStackNavigator();

const ListNavigator = () =>{
  <Stack.Navigator>
    <Stack.Screen name="MyAccount" component={AccountScreen} />
    <Stack.Screen name="MyListing" component={MyListingScreen} />
    <Stack.Screen name="AccountDetails" component={AccountDetailsScreen} />
  </Stack.Navigator>
}

export default ListNavigator;