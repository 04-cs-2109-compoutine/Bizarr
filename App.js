import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import NavigationTheme from './components/NavigationTheme';
import BottomNavigator from './components/BottomNavigator';
import ListingsScreen from './screens/ListingsScreen';
import LaunchScreen from './screens/LaunchScreen';
import MyMap from './MyMap.js'
import SignUpScreen from "./screens/SignUpScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator >
        <Stack.Screen options={{ headerShown: false }} name="Launch" component={LaunchScreen}/>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Sign up" component={SignUpScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
