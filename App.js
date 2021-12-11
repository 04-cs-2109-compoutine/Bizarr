import React, { useState } from "react";
import Main from "./screens/Main";
import AppLoading from "expo-app-loading";
import { Asset } from "expo-asset";

//remove this line to display errors
import { LogBox } from "react-native";

LogBox.ignoreAllLogs(true);

export default function App() {
  const [launchLoaded, setLaunchLoaded] = useState(false);
  const _cacheResourcesAsync = async () => {
    const images = [
      require("./assets/image/transpmap2.gif"),
      require("./assets/B.png"),
    ];
    const cacheImages = images.map((image) => {
      return Asset.fromModule(image).downloadAsync();
    });
    return Promise.all(cacheImages);
  };

  return launchLoaded === true ? ( <Main />) : 
  (
    <AppLoading
      startAsync={_cacheResourcesAsync}
      onFinish={() => setLaunchLoaded(true)}
      onError={console.warn}
    />
  );
}
