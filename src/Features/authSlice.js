import {createSlice} from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {isLoggedIn: false},
  reducers: {
    signIn: (state, action) => {
      console.log('Login', state);
      state.isLoggedIn = action.payload;
      //state.isLoggedIn = true;
    },
    signOut: state => {
      state.isLoggedIn = false;
    },
  },
});

export const {signIn, signOut} = authSlice.actions;

export default authSlice.reducer;
