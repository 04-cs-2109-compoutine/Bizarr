import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { AppLoading } from "expo";
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import navigationTheme from "./components/NavigationTheme"
import LoginScreen from './screens/LoginScreen';
import NavigationTheme from './components/NavigationTheme';
import BottomNavigator from './components/BottomNavigator';
import ListingsScreen from './screens/ListingsScreen';
import LaunchScreen from './screens/LaunchScreen';
import SignUpScreen from "./screens/SignUpScreen";
import HomeScreen from "./screens/HomeScreen"
import AuthNavigator from './components/AuthNavigator';
import AuthContext from "./components/context"

export default function App() {
  const [user, setUser] = useState();

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <NavigationContainer theme={navigationTheme}>
        {user ? <BottomNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}