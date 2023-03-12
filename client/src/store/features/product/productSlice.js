import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../services/axios';

const initialState = {
  products: [],
  loading: false,
  status: null,
  message: null
};

export const getAllProduct = createAsyncThunk(
  'product/getAllProduct',
  async () => {
    try {
      const { data } = await axios.get('/products');
      return data;
    } catch (error) {
      return error.data;
    }
  }
);

export const createProduct = createAsyncThunk(
  'product/createProduct',
  async newProduct => {
    try {
      const { data } = await axios.post('/products', newProduct);
      return data;
    } catch (error) {
      return error.data;
    }
  }
);

export const removeProduct = createAsyncThunk(
  'product/removeProduct',
  async productId => {
    try {
      const { data } = await axios.delete(`/products/${productId}`, productId);
      return data;
    } catch (error) {
      return error.data;
    }
  }
);

export const editProduct = createAsyncThunk(
  'product/editProduct',
  async editedProduct => {
    try {
      const { data } = await axios.patch(
        `/products/${editedProduct.get('_id')}`,
        editedProduct
      );
      return data;
    } catch (error) {
      return error.data;
    }
  }
);

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: {
    //Получение всех товаров
    [getAllProduct.pending]: state => {
      state.loading = true;
      state.status = 'pending';
      state.message = null;
    },
    [getAllProduct.fulfilled]: (state, action) => {
      state.products = action.payload;
      state.loading = false;
      state.status = 'fulfilled';
      state.message = null;
    },
    [getAllProduct.rejected]: (state, action) => {
      state.loading = false;
      state.message = action.payload.error.message;
      state.status = 'rejected';
    },
    // Создание товара
    [createProduct.pending]: state => {
      state.loading = true;
      state.message = null;
      state.status = 'pending';
    },
    [createProduct.fulfilled]: (state, action) => {
      state.products.push(action.payload);
      state.loading = false;
      state.message = action.payload.message;
      state.status = 'fulfilled';
    },
    [createProduct.rejected]: (state, action) => {
      state.loading = false;
      state.message = action.payload.error.message;
      state.status = 'fulfilled';
    },
    // Удаление товара
    [removeProduct.pending]: state => {
      state.loading = true;
      state.message = null;
      state.status = 'pending';
    },
    [removeProduct.fulfilled]: (state, action) => {
      state.products = state.products.filter(product => {
        return product._id !== action.payload._id;
      });
      state.loading = false;
      state.message = action.payload.message;
      state.status = 'fulfilled';
    },
    [removeProduct.rejected]: (state, action) => {
      state.loading = false;
      state.message = action.payload.error.message;
      state.status = 'fulfilled';
    },
    // Изменение товара
    [editProduct.pending]: state => {
      state.loading = true;
      state.message = null;
      state.status = 'pending';
    },
    [editProduct.fulfilled]: (state, action) => {
      const index = state.products.findIndex(product => {
        return product._id === action.payload._id;
      });
      state.products[index] = action.payload;
      state.loading = false;
      state.message = action.payload.message;
      state.status = 'fulfilled';
    },
    [editProduct.rejected]: (state, action) => {
      state.loading = false;
      state.message = action.payload.error.message;
      state.status = 'fulfilled';
    }
  }
});

export default productSlice.reducer;
