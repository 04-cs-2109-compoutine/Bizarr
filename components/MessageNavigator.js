import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ChatScreen from "../screens/ChatScreen";
import MessagesScreen from "../screens/MessagesScreen"

const Stack = createNativeStackNavigator();

const ListNavigator = () =>{
  <Stack.Navigator>
    <Stack.Screen name="Messages" component={MessagesScreen} />
    <Stack.Screen name="SingleMessage" component={ChatScreen} />
  </Stack.Navigator>
}

export default ListNavigator;