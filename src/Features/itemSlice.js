import {createSlice} from '@reduxjs/toolkit';

const initialState = {items: []};

const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const itemToAdd = action.payload;

      state.items.push(itemToAdd);
    },
    request: state => {
      state.isFetching = true;
    },
    requestEvery: state => {
      state.isFetching = true;
    },
    requestLatest: state => {
      state.isFetching = true;
    },
    success: (state, action) => {
      state.items = action.payload;
      state.isFetching = false;
      state.failure = false;
      state.errorMessage = '';
    },
    failure: (state, action) => {
      state.isFetching = false;
      state.errorMessage = action.errorMessage;
      state.failure = true;
    },
  },
});

export const itemsActions = itemsSlice.actions;

export default itemsSlice.reducer;
