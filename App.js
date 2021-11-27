import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import navigationTheme from "./components/NavigationTheme"
import BottomNavigator from './components/BottomNavigator';
import AuthNavigator from './components/AuthNavigator';
import AuthContext from "./components/context";
import PhotoPicker from "./components/PhotoPicker"
import PostListingScreen from "./screens/PostListingScreen";
import SearchLocation from './screens/SearchLocationScreen';
import PhotoInput from './components/PhotoInput'

export default function App() {
  const [user, setUser] = useState();

  return (
    // <AuthContext.Provider value={{ user, setUser }}>
    //   <NavigationContainer theme={navigationTheme}>
    //     {user ? <BottomNavigator /> : <AuthNavigator />}
    //   </NavigationContainer>
    // </AuthContext.Provider>
    <PostListingScreen/>
  );
}