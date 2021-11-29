import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SingleMessageScreen from "../screens/SingleMessageScreen";
import MessagesScreen from "../screens/MessagesScreen";

const Stack = createNativeStackNavigator();

const MessageNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen options={{ headerShown: false }}  name="Messages" component={MessagesScreen} />
    <Stack.Screen options={{ headerShown: false }} name="SingleMessage" component={SingleMessageScreen} />
  </Stack.Navigator>
);

export default MessageNavigator;
