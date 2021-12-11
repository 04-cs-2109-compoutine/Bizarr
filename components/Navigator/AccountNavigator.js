import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AccountScreen from "../../screens/AccountScreen";
import AccountDetailsScreen from "../../screens/AccountDetailsScreen";
import MyListingScreen from "../../screens/MyListingScreen";
import SoldListingScreen from "../../screens/SoldListing"
import PostedScreen from "../../screens/PostedScreen";
import FavoriteListing from "../../screens/FavoriteListing";
import SingleListingScreen from "../../screens/SingleListingScreen";
import UserSingleListingScreen from "../../screens/UserSingleListingScreen";
import SellerListingScreen from "../../screens/SellerListingScreen";

const Stack = createNativeStackNavigator();

const AccountNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="My Account"
      component={AccountScreen} />

    <Stack.Screen
      options={{ headerShown: false }}
      name="Posted Screen"
      component={PostedScreen}/>

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
      name="Listing Details" 
      component={SingleListingScreen} 
      options={{headerTitle: ""}}/>

    <Stack.Screen
      name="Sold Listing Screen"
      component={SoldListingScreen}
      options={{headerTitle: ""}}/>

    <Stack.Screen
      name="Saved Items"
      component={FavoriteListing}
      options={{headerTitle: ""}}/>  

    <Stack.Screen 
      name="Seller Listings" 
      component={SellerListingScreen} 
      options={{headerTitle: ""}}/>

  </Stack.Navigator>
)

export default AccountNavigator;
