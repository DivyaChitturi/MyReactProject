import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import {createLogger} from 'redux-logger';
import counterSlice from './src/Features/counterSlice';
import cartSlice from './src/Features/cartSlice';

const isDebuggingInChrome = __DEV__ && !!window.navigator.userAgent;

const logger = createLogger({
  predicate: () => isDebuggingInChrome,
  collapsed: true,
  duration: true,
  diff: true,
});

export default configureStore({
  reducer: {
    counter: counterSlice,
    cart: cartSlice,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(logger),
});
