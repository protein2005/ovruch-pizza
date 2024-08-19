import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchValue: '',
  categoryId: 0,
  pageCount: 1,
  sort: {
    name: 'популярністю (за спаданням)',
    sortProperty: 'rating',
  },
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategoryId(state, action) {
      state.categoryId = action.payload;
    },
    setSearchValue(state, action) {
      state.searchValue = action.payload;
    },
    setSort(state, action) {
      state.sort = action.payload;
    },
    setPageCount(state, action) {
      state.pageCount = action.payload;
    },
    setFiltres(state, action) {
      state.categoryId = Number(action.payload.categoryId);
      state.sort = action.payload.sort;
      state.pageCount = Number(action.payload.pageCount);
    },
  },
});

export const { setCategoryId, setSort, setPageCount, setFiltres, setSearchValue } =
  filterSlice.actions;
export default filterSlice.reducer;
