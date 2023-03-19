import { createAsyncThunk } from '@reduxjs/toolkit';
import axios
  from 'axios';

export const fetchCarts = createAsyncThunk(
  'carts/fetchCarts',
  async () => {
    const response = await axios.get('https://dummyjson.com/carts');
    return response.data.carts;
  },
);

export const addNewCart = createAsyncThunk(
  'carts/addNewCart',
  async (cartData) => {
    const { arrayOfProducts } = cartData;
    const response = await axios.post('https://dummyjson.com/carts/add', {
      userId: 1,
      products: arrayOfProducts,
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  },
);

export const deleteCart = createAsyncThunk(
  'carts/deleteCartAsync',
  async (id) => {
    const response = await axios.delete(`https://dummyjson.com/carts/${id}`);
    return response.data.id;
  },
);
