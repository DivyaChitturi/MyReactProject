import {createSlice} from '@reduxjs/toolkit';

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItems: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const itemToAdd = action.payload;

      const itemPresentKey = state.cartItems.findIndex(thisElement => {
        return thisElement.item.name === itemToAdd.name;
      });

      if (itemPresentKey !== -1) {
        const itemFound = state.cartItems[itemPresentKey];
        itemFound.quantity += 1;
      } else {
        state.cartItems.push({item: itemToAdd, quantity: 1});
      }
    },
    removeFromCart: (state, action) => {
      const itemToAdd = action.payload;

      const itemPresentKey = state.cartItems.findIndex(thisElement => {
        return thisElement.item.name === itemToAdd.name;
      });

      if (itemPresentKey !== -1) {
        const itemFound = state.cartItems[itemPresentKey];
        if (itemFound.quantity > 1) {
          itemFound.quantity -= 1;
        } else {
          state.cartItems.pop({item: itemToAdd, quantity: 1});
        }
      } else {
        state.cartItems.pop({item: itemToAdd, quantity: 1});
      }
    },
    clearCart: state => {},
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
