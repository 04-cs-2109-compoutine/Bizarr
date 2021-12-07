import React, { useState } from "react";
import { Provider } from "react-redux";
import Main from "./screens/Main";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store";
import AppLoading from "expo-app-loading";
import { Asset } from "expo-asset";

export default function App() {
  const [launchLoaded, setLaunchLoaded] = useState(false);
  const _cacheResourcesAsync = async () => {
    try{
    const images = [
      require("./assets/image/transpmap2.gif"),
      require("./assets/B.png"),
    ];
  
    const cacheImages = images.map((image) => {
      if (typeof image === 'string') {
        return Image.prefetch(image);
      } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
  return Promise.all(cacheImages);
  }catch(e){
    console.log(e)

  }
  };
  
  return ( launchLoaded === true ? (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Main />
      </PersistGate>
    </Provider>
  ) : (
    <AppLoading
      startAsync={() =>_cacheResourcesAsync}
      onFinish={() => setLaunchLoaded(true)}
      onError={console.warn}
    />
  )
  );
}
