import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SearchLocationScreen from '../screens/SearchLocationScreen';
import PostListingScreen from '../screens/PostListingScreen';

const Stack = createNativeStackNavigator();

function PostNavigator() {
  return (
    <Stack.Navigator >
      <Stack.Screen 
        options={{ headerShown: false }} 
        name="Post Listing" 
        component={ PostListingScreen }/>
      <Stack.Screen name="Search Location" component={SearchLocationScreen}/>
    </Stack.Navigator>
  );
}

export default PostNavigator;