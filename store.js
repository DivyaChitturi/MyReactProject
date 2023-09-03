import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import {createLogger} from 'redux-logger';
import reducers from './src/Features/reducers';
import {combineReducers} from '@reduxjs/toolkit';
import persistReducer from 'redux-persist/es/persistReducer';
import storage from 'redux-persist/lib/storage';
import persistStore from 'redux-persist/lib/persistStore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import sagas from './src/Sagas';
import createSagaMiddleware from 'redux-saga';
import authSlice from './src/Features/authSlice';
import cartSlice from './src/Features/cartSlice';
import counterSlice from './src/Features/counterSlice';
import itemSlice from './src/Features/itemSlice';
import userSlice from './src/Features/userSlice';

const isDebuggingInChrome = __DEV__ && !!window.navigator.userAgent;

let persistConfig = {key: 'root', storage: AsyncStorage};
// let rootReducer = combineReducers(reducers);
// let persistedReducer = persistReducer(persistConfig, rootReducer);

const logger = createLogger({
  predicate: () => isDebuggingInChrome,
  collapsed: true,
  duration: true,
  diff: true,
});

const sagaMiddleware = createSagaMiddleware();

export default configureStore({
  reducer: {
    counter: counterSlice,
    cart: cartSlice,
    Auth: authSlice,
    user: userSlice,
    item: itemSlice,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(logger, sagaMiddleware),
});

sagaMiddleware.run(sagas);
