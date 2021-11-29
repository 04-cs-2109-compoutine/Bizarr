<<<<<<< HEAD
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import NavigationTheme from "./components/NavigationTheme";
import BottomNavigator from "./components/BottomNavigator";
import ListingsScreen from "./screens/ListingsScreen";
import LaunchScreen from "./screens/LaunchScreen";
import MyMap from "./MyMap.js";
=======
import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import navigationTheme from "./components/NavigationTheme"
import BottomNavigator from './components/BottomNavigator';
import AuthNavigator from './components/AuthNavigator';
import AuthContext from "./components/context";
import SendMessage from './components/SendMessage'
import ListingsScreen from './screens/ListingsScreen';
import LaunchScreen from './screens/LaunchScreen';
>>>>>>> main
import SignUpScreen from "./screens/SignUpScreen";
import SingleMessageScreen from "./screens/SingleMessageScreen";
import MessagesScreen from "./screens/MessagesScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState();

  return (
<<<<<<< HEAD
    <SingleMessageScreen />
    // <NavigationContainer>
    //   <Stack.Navigator>
    //     <Stack.Screen
    //       options={{ headerShown: false }}
    //       name="Launch"
    //       component={LaunchScreen}
    //     />
    //     <Stack.Screen name="Login" component={LoginScreen} />
    //     <Stack.Screen name="Sign up" component={SignUpScreen} />
    //   </Stack.Navigator>
    // </NavigationContainer>
=======
    <AuthContext.Provider value={{ user, setUser }}>
      <NavigationContainer theme={navigationTheme}>
        {user ? <BottomNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    </AuthContext.Provider>
>>>>>>> main
  );
}