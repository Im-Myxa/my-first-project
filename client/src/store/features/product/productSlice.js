import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../services/axios';

const initialState = {
  products: [],
  loading: false,
  status: null
};

export const getAllProduct = createAsyncThunk(
  'product/getAllProduct',
  async newProduct => {
    try {
      const response = await axios.post('/products', newProduct);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

export const createProduct = createAsyncThunk(
  'product/createProduct',
  async newProduct => {
    try {
      const response = await axios.post('/products', newProduct);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: {
    [getAllProduct.pending]: state => {
      state.loading = true;
      state.status = null;
    },
    [getAllProduct.fulfilled]: (state, action) => {
      state.products = action.payload;
      state.loading = false;
    },
    [getAllProduct.rejected]: (state, action) => {
      state.loading = false;
      state.status = action.payload.error.message;
    },
    [createProduct.pending]: state => {
      state.loading = true;
      state.status = null;
    },
    [createProduct.fulfilled]: (state, action) => {
      state.products.push(action.payload.product);
      state.loading = false;
      state.status = action.payload.message;
    },
    [createProduct.rejected]: (state, action) => {
      state.loading = false;
      state.status = action.payload.error.message;
    }
  }
});

export default productSlice.reducer;
