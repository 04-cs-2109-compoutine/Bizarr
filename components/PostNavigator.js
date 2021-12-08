import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import SearchLocationScreen from '../screens/SearchLocationScreen';
import PostListingScreen from "../screens/PostListingScreen";
import MyListingScreen from "../screens/MyListingScreen";
import PostedScreen from "../screens/PostedScreen";

//const Stack = createNativeStackNavigator();

function PostNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name="Post Listing"
        component={PostListingScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="My Listings"
        component={MyListingScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Posted Screen"
        component={PostedScreen}
      />
      {/* <Stack.Screen name="Search Location" component={SearchLocationScreen}/> */}
    </Stack.Navigator>
  );
}

export default PostNavigator;
