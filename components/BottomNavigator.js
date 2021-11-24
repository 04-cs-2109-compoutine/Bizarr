import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons, AntDesign, FontAwesome5 } from "@expo/vector-icons";

import HomeScreen from "../screens/HomeScreen";
import MessageNavigator from "./MessageNavigator";
import PostListingScreen from "../screens/PostListingScreen";
import PostButton from "./PostButton";
import ListNavigator from "./ListNavigator";
import AccountNavigator from "./AccountNavigator";
import routes from "./routes";

const Tab = createBottomTabNavigator();

const BottomNavigator = () => (
  <Tab.Navigator>
    <Tab.Screen
      name="Home"
      component={HomeScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons 
            name="home" 
            color={color} 
            size={size} 
          />
        ),
      }}
    />
    <Tab.Screen
      name="Message"
      component={MessageNavigator}
      options={{
        tabBarIcon: ({ color, size }) => (
          <AntDesign
            name="message1"
            color={color}
            size={size}
          />
        ),
      }}
    />
    <Tab.Screen
      name="PostListing"
      component={PostListingScreen}
      options={({ navigation }) => ({
        tabBarButton: () => (
          <PostButton
            onPress={() => console.log("Posted!")}
          />
        ),
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons
            name="plus-circle"
            color={color}
            size={size}
          />
        ),
      })}
    />
    <Tab.Screen
      name="All Listings"
      component={ListNavigator}
      options={{ tabBarIcon: ({ color, size }) => (
          <FontAwesome5
            name="border-all"
            color={color}
            size={size}
          />
        ),
      }}
    />
    <Tab.Screen
      name="Account"
      component={AccountNavigator}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons 
            name="account" 
            color={color} 
            size={size} />
        ),
      }}
    />
  </Tab.Navigator>
);

export default BottomNavigator;