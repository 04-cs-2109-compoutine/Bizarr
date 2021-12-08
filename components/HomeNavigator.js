import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from '../screens/HomeScreen';
import ListingsScreen from '../screens/ListingsScreen';

const Stack = createNativeStackNavigator();

const HomeNavigator =  () => (
  <Stack.Navigator >
    <Stack.Screen options={{ headerShown: false }} name="Home" component={HomeScreen}/>
    <Stack.Screen options={{headerTitle: ""}} name="All listings" component={ListingsScreen}/>
  </Stack.Navigator>
)

export default HomeNavigator;