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

const Stack = createNativeStackNavigator();

const HomeNavigator =  () => (
  <Stack.Navigator >
    <Stack.Screen options={{ headerShown: false }} name="Home" component={HomeScreen}/>
    <Stack.Screen options={{headerTitle: ""}} name="Furniture" component={Funiture}/>
    <Stack.Screen options={{headerTitle: ""}} name="Car" component={Cars}/>
    <Stack.Screen options={{headerTitle: ""}} name="Electronics" component={Electronics}/>
    <Stack.Screen options={{headerTitle: ""}} name="Books" component={Books}/>
    <Stack.Screen options={{headerTitle: ""}} name="Clothing" component={Clothing}/>
    <Stack.Screen options={{headerTitle: ""}} name="Sports" component={Sports}/>
    <Stack.Screen options={{headerTitle: ""}} name="Entertainment" component={Entertainment}/>
    <Stack.Screen options={{headerTitle: ""}} name="Others" component={Others}/>
  </Stack.Navigator>
)

export default HomeNavigator;