import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import navigationTheme from "./components/NavigationTheme"
import BottomNavigator from './components/BottomNavigator';
import AuthNavigator from './components/AuthNavigator';
import AuthContext from "./components/context";
import LocationMap from './components/LocationMap';
import SingleListingScreen from './screens/SingleListingScreen';
import AccountDetailsScreen from './screens/AccountDetailsScreen';

export default function App() {
  const [user, setUser] = useState();

  return (
    // <AuthContext.Provider value={{ user, setUser }}>
    //   <NavigationContainer theme={navigationTheme}>
    //     {user ? <BottomNavigator /> : <AuthNavigator />}
    //   </NavigationContainer>
    // </AuthContext.Provider>
    <AccountDetailsScreen/>
  );
}