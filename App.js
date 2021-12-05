import React, { useState } from 'react';
import { Provider } from 'react-redux';
import Main from './screens/Main';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store';
import AppLoading from 'expo-app-loading';
import { Asset } from 'expo-asset'



export default function App() {
const [launchLoaded, setLaunchLoaded] = useState(false)
const  _cacheResourcesAsync = async () => {
  const images = [require('./assets/image/transpmap2.gif'), require('./assets/B.png')];

  const cacheImages = images.map(image => {
    return Asset.fromModule(image).downloadAsync();
  }); 
  return Promise.all(cacheImages);
}
  return (
    launchLoaded === true ? (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Main />
      </PersistGate>
    </Provider>) : (
      <AppLoading
      startAsync={_cacheResourcesAsync}
      onFinish={() => setLaunchLoaded(true)}
      onError={console.warn}
    />
    )
  );
}
