import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LaunchScreen from "../screens/LaunchScreen";
import SignUpScreen from "../screens/SignUpScreen";
import LoginScreen from "../screens/LoginScreen";

const Stack = createNativeStackNavigator();

const AuthNavigator = () => (
    <Stack.Navigator >
      <Stack.Screen options={{ headerShown: false }} name="Launch" component={LaunchScreen}/>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Sign up" component={SignUpScreen}/>
    </Stack.Navigator>
)

export default AuthNavigator;
