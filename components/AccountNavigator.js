import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AccountScreen from "../screens/AccountScreen";
import AccountDetailsScreen from "../screens/AccountDetailsScreen";
import MyListingScreen from "../screens/MyListingScreen";
import UserSingleListingScreen from "../screens/UserSingleListingScreen";
import SoldListingScreen from "../screens/SoldListing"

const Stack = createNativeStackNavigator();

const AccountNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen 
      name="My Account" 
      component={AccountScreen} />

    <Stack.Screen 
      name="My Listings" 
      component={MyListingScreen} 
      options={{headerTitle: ""}}/>

    <Stack.Screen 
      name="Account Details" 
      component={AccountDetailsScreen} 
      options={{headerTitle: ""}}/>

    <Stack.Screen 
      name="User Single Listing Screen" 
      component={UserSingleListingScreen} 
      options={{headerTitle: ""}}/>

    <Stack.Screen 
      name="Sold Listing Screen" 
      component={SoldListingScreen} 
      options={{headerTitle: ""}}/>

  </Stack.Navigator>
)

export default AccountNavigator;