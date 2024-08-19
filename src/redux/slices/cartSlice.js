import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  totalPrice: 0,
  items: [],
  totalCount: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);
      if (findItem) {
        findItem.count++;
      } else {
        state.items = [...state.items, { ...action.payload, count: 1 }];
      }
      state.totalPrice = state.items.reduce((sum, obj) => sum + obj.price * obj.count, 0);
      state.totalCount = state.items.reduce((sum, obj) => sum + obj.count, 0);
    },
    plusItem(state, action) {
      const findItem = state.items.find((obj) => obj.id === action.payload);
      findItem.count++;
      state.totalPrice = state.items.reduce((sum, obj) => sum + obj.price * obj.count, 0);
      state.totalCount = state.items.reduce((sum, obj) => sum + obj.count, 0);
    },
    minusItem(state, action) {
      const findItem = state.items.find((obj) => obj.id === action.payload);
      findItem.count--;
      state.totalPrice = state.items.reduce((sum, obj) => sum + obj.price * obj.count, 0);
      state.totalCount = state.items.reduce((sum, obj) => sum + obj.count, 0);
    },
    removeItem(state, action) {
      state.items = state.items.filter((obj) => obj.id !== action.payload);
      state.totalPrice = state.items.reduce((sum, obj) => sum + obj.price * obj.count, 0);
      state.totalCount = state.items.reduce((sum, obj) => sum + obj.count, 0);
    },
    clearItems(state) {
      state.totalPrice = 0;
      state.items = [];
      state.totalCount = 0;
    },
  },
});

export const selectCart = (state) => state.cart;

export const { addItem, plusItem, minusItem, removeItem, clearItems } = cartSlice.actions;
export default cartSlice.reducer;
