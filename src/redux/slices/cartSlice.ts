import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { getCartFromLS } from '../../utils/getCartFromLS';

export type CartItem = {
  id: string;
  title: string;
  price: number;
  count: number;
  imageUrl: string;
  type: string;
  size: number;
};

interface CartSliceState {
  totalPrice: number;
  items: CartItem[];
  totalCount: number;
}

const cartData = getCartFromLS();

const initialState: CartSliceState = {
  totalPrice: cartData.totalPrice,
  items: cartData.items,
  totalCount: cartData.totalCount,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItem>) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);
      if (findItem) {
        findItem.count++;
      } else {
        state.items = [...state.items, { ...action.payload, count: 1 }];
      }
      state.totalPrice = state.items.reduce((sum, obj) => sum + obj.price * obj.count, 0);
      state.totalCount = state.items.reduce((sum, obj) => sum + obj.count, 0);
    },
    plusItem(state, action: PayloadAction<string>) {
      const findItem = state.items.find((obj) => obj.id === action.payload);
      if (findItem) {
        findItem.count++;
      }
      state.totalPrice = state.items.reduce((sum, obj) => sum + obj.price * obj.count, 0);
      state.totalCount = state.items.reduce((sum, obj) => sum + obj.count, 0);
    },
    minusItem(state, action: PayloadAction<string>) {
      const findItem = state.items.find((obj) => obj.id === action.payload);
      if (findItem) {
        findItem.count--;
      }
      state.totalPrice = state.items.reduce((sum, obj) => sum + obj.price * obj.count, 0);
      state.totalCount = state.items.reduce((sum, obj) => sum + obj.count, 0);
    },
    removeItem(state, action: PayloadAction<string>) {
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

export const selectCart = (state: RootState) => state.cart;

export const { addItem, plusItem, minusItem, removeItem, clearItems } = cartSlice.actions;
export default cartSlice.reducer;
