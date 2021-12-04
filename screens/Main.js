import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import navigationTheme from "../components/Config/NavigationTheme";
import BottomNavigator from "../components/BottomNavigator";
import AuthNavigator from "../components/AuthNavigator";
import AuthContext from "../components/Config/context";

function Main() {
  const [user, setUser] = useState();

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <NavigationContainer theme={navigationTheme}>
        {user ? <BottomNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
export default Main;