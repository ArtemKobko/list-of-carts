import { createSlice } from '@reduxjs/toolkit';
import { addNewCart, deleteCart, fetchCarts } from './middlewares';

const initialState = {
  allCarts: [],
  isLoading: false,
  isModalActive: false,
};

const cartSlice = createSlice({
  name: 'allCarts',
  initialState,
  reducers: {
    changeModalState(state, action) {
      state.isModalActive = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCarts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchCarts.fulfilled, (state, action) => {
      state.allCarts = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchCarts.rejected, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteCart.fulfilled, (state, action) => {
      state.allCarts = state.allCarts.filter((cart) => cart.id !== action.payload);
    });
    builder.addCase(addNewCart.fulfilled, (state, action) => {
      state.allCarts = [...state.allCarts, action.payload];
    });
  },
});

export const { changeModalState } = cartSlice.actions;
export default cartSlice.reducer;
