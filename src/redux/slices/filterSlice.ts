import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Sort = {
  name: string;
  sortProperty: string;
};

export interface FilterSliceState {
  searchValue: string;
  categoryId: number;
  pageCount: number;
  sort: Sort
}

const initialState: FilterSliceState = {
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
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setSort(state, action: PayloadAction<Sort>) {
      state.sort = action.payload;
    },
    setPageCount(state, action: PayloadAction<number>) {
      state.pageCount = action.payload;
    },
    setFiltres(state, action: PayloadAction<{ categoryId: string; sort: Sort; pageCount: string }>) {
      state.categoryId = Number(action.payload.categoryId);
      state.sort = action.payload.sort;
      state.pageCount = Number(action.payload.pageCount);
    },
  },
});

export const { setCategoryId, setSort, setPageCount, setFiltres, setSearchValue } =
  filterSlice.actions;
export default filterSlice.reducer;
