import React from 'react';
import { Provider } from 'react-redux';
import Main from './screens/Main';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store';

export default function App() {

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Main />
      </PersistGate>
    </Provider>
  );
}
