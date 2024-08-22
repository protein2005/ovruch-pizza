import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export type FetchParams = Record<string, number>;

export const fetchPizzas = createAsyncThunk('pizza/fetchPizzasStatus', async (params: FetchParams) => {
  const { category, sortBy, order, currentPage } = params;
  const { data } = await axios.get<Pizza[]>(
    `https://66b9e544fa763ff550fa03e6.mockapi.io/pizza?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}`,
  );
  return data;
});

type Pizza = {
  id: string;
  imageUrl: string;
  name: string;
  types: number[];
  sizes: number[];
  price: number;
  category: number;
  rating: number;
};

interface PizzaSliceState {
  items: Pizza[];
  status: string;
}

const initialState: PizzaSliceState = {
  items: [],
  status: 'loading',
};

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzas.pending, (state) => {
        state.status = 'loading';
        state.items = [];
      })
      .addCase(fetchPizzas.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = 'success';
      })
      .addCase(fetchPizzas.rejected, (state) => {
        state.status = 'error';
        state.items = [];
      });
  },
});

export const { setItems } = pizzaSlice.actions;
export default pizzaSlice.reducer;
