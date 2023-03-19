import { configureStore } from '@reduxjs/toolkit';
import cartSlice from '../models/carts/cartSlice';

const store = configureStore({
  reducer: {
    carts: cartSlice,
  },
});

export default store;
