import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import navigationTheme from "./components/NavigationTheme"
import BottomNavigator from './components/BottomNavigator';
import AuthNavigator from './components/AuthNavigator';
import AuthContext from "./components/context";
import LocationMap from './components/LocationMap';
import SingleListingScreen from './screens/SingleListingScreen';
import AccountDetailsScreen from './screens/AccountDetailsScreen';
import onPoiClick from './screens/SearchLocationScreen'
import SendMessage from './components/SendMessage'
import ListingsScreen from './screens/ListingsScreen';
import LaunchScreen from './screens/LaunchScreen';
import SignUpScreen from "./screens/SignUpScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState();

  return (
    // <AuthContext.Provider value={{ user, setUser }}>
    //   <NavigationContainer theme={navigationTheme}>
    //     {user ? <BottomNavigator /> : <AuthNavigator />}
    //   </NavigationContainer>
    // </AuthContext.Provider>
    <onPoiClick/>
  );
}