import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from '../screens/HomeScreen';
import Funiture from './CategoryScreen/Funiture';
import Cars from './CategoryScreen/Cars';
import Electronics from './CategoryScreen/Electronics';
import Clothing from './CategoryScreen/Clothing';
import Sports from './CategoryScreen/Sports';
import Entertainment from './CategoryScreen/Entertainment';
import Others from './CategoryScreen/Others';
import Books from './CategoryScreen/Books';
import SingleListingScreen from "../screens/SingleListingScreen";
import SellerListingScreen from '../screens/SellerListingScreen';
import SingleMessageScreen from "../screens/SingleMessageScreen";

const Stack = createNativeStackNavigator();

const HomeNavigator =  () => (
  <Stack.Navigator >
    <Stack.Screen options={{ headerShown: false }} name="HomePage" component={HomeScreen}/>
    <Stack.Screen options={{headerTitle: ""}} name="Furniture" component={Funiture}/>
    <Stack.Screen options={{headerTitle: ""}} name="Car" component={Cars}/>
    <Stack.Screen options={{headerTitle: ""}} name="Electronics" component={Electronics}/>
    <Stack.Screen options={{headerTitle: ""}} name="Books" component={Books}/>
    <Stack.Screen options={{headerTitle: ""}} name="Clothing" component={Clothing}/>
    <Stack.Screen options={{headerTitle: ""}} name="Sports" component={Sports}/>
    <Stack.Screen options={{headerTitle: ""}} name="Entertainment" component={Entertainment}/>
    <Stack.Screen options={{headerTitle: ""}} name="Others" component={Others}/>
    <Stack.Screen name="SingleMessage" component={SingleMessageScreen} options={{headerTitle: "Chat"}}/>
    <Stack.Screen name="Seller Listings" component={SellerListingScreen} options={{headerTitle: ""}}/>
    <Stack.Screen name="Listing Details" component={SingleListingScreen} options={{headerTitle: ""}}/>
  </Stack.Navigator>
)

export default HomeNavigator;