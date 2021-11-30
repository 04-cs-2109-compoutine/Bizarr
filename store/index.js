import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import user from './user';
import listings from './listings';
import messages from './messages'

const appReducer = combineReducers({
  user,
  messages,
  listings
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, appReducer);

export const store = createStore(
  persistedReducer,
  applyMiddleware(thunkMiddleware)
);

export const persistor = persistStore(store);