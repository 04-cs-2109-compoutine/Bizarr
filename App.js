import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import navigationTheme from "./components/NavigationTheme"
import BottomNavigator from './components/BottomNavigator';
import AuthNavigator from './components/AuthNavigator';
import AuthContext from "./components/context";
import SendMessage from './components/SendMessage'
import { View } from 'react-native';
import PostListingScreen from './screens/PostListingScreen';
import PhotoPicker from './components/PhotoPicker';
import SearchLocation from './components/SearchLocation';

export default function App() {
  const [user, setUser] = useState();

  return (
    // <AuthContext.Provider value={{ user, setUser }}>
    //   <NavigationContainer theme={navigationTheme}>
    //     {user ? <BottomNavigator /> : <AuthNavigator />}
    //   </NavigationContainer>
    // </AuthContext.Provider>
    
      <SearchLocation/>
   
  );
}