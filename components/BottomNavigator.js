import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons, AntDesign, FontAwesome5 } from "@expo/vector-icons";
import HomeScreen from "../screens/HomeScreen";
import MessageNavigator from "./MessageNavigator";
import PostButton from "./Button/PostButton";
import ListNavigator from "./ListNavigator";
import AccountNavigator from "./AccountNavigator";
import PostNavigator from "./PostNavigator";
import routes from "./Config/routes";
import PostListingScreen from "../screens/PostListingScreen";

const Tab = createBottomTabNavigator();

const BottomNavigator = () => (
  <Tab.Navigator>
    <Tab.Screen
      name="Home"
      component={HomeScreen}
      options={{
        headerShown: false,
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
      name="Messages"
      component={MessageNavigator}
      options={{ 
        headerShown: false,
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
      name="Post Listing"
      component={PostListingScreen}
      options={({ navigation }) => ({
        tabBarButton: () => (
          <PostButton
            onPress={() => navigation.navigate(routes.POST_LISTING)}
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
      options={{ 
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
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
        headerShown: false,
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