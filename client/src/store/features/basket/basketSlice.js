import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../services/axios';

const initialState = {
  products: [],
  loading: false,
  status: null,
  message: null
};

export const getBasket = createAsyncThunk('basket/getBasket', async userId => {
  try {
    const { data } = await axios.get(`/basket/${userId}`);
    return data;
  } catch (error) {
    return error.data;
  }
});

export const addProductInBasket = createAsyncThunk(
  'basket/addProductInBasket',
  async newProduct => {
    try {
      const { data } = await axios.post(
        `/basket/${newProduct.userId}`,
        newProduct
      );
      console.log(data);

      return data;
    } catch (error) {
      return error.data;
    }
  }
);

export const removeProductInBasket = createAsyncThunk(
  'basket/removeProductInBasket',
  async removedProduct => {
    try {
      const { data } = await axios.delete(
        `/basket/${removedProduct.userId}`,
        removedProduct
      );
      return data;
    } catch (error) {
      return error.data;
    }
  }
);

export const decrementProduct = createAsyncThunk(
  'basket/decrementProduct',
  async decrementedProduct => {
    try {
      const { data } = await axios.patch(
        `/basket/${decrementedProduct.userId}`,
        decrementedProduct
      );
      return data;
    } catch (error) {
      return error.data;
    }
  }
);

export const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {},
  extraReducers: {
    //Получение корзины
    [getBasket.pending]: state => {
      state.loading = true;
      state.status = 'pending';
      state.message = null;
    },
    [getBasket.fulfilled]: (state, action) => {
      state.products = action.payload;
      state.loading = false;
      state.status = 'fulfilled';
      state.message = null;
    },
    [getBasket.rejected]: (state, action) => {
      state.loading = false;
      state.message = action.payload.error.message;
      state.status = 'rejected';
    },
    // Добавление товара в корзину
    [addProductInBasket.pending]: state => {
      state.loading = true;
      state.message = null;
      state.status = 'pending';
    },
    [addProductInBasket.fulfilled]: (state, action) => {
      const index = state.products.findIndex(product => {
        return product.productId === action.payload.productId;
      });
      if (index) {
        state.products[index] = action.payload;
      } else {
        state.products.push(action.payload);
      }
      state.loading = false;
      state.message = action.payload.message;
      state.status = 'fulfilled';
    },
    [addProductInBasket.rejected]: (state, action) => {
      state.loading = false;
      state.message = action.payload.error.message;
      state.status = 'fulfilled';
    },
    // Удаление товара
    [removeProductInBasket.pending]: state => {
      state.loading = true;
      state.message = null;
      state.status = 'pending';
    },
    [removeProductInBasket.fulfilled]: (state, action) => {
      state.products = state.products.filter(product => {
        return product.productId !== action.payload.productId;
      });
      state.loading = false;
      state.message = action.payload.message;
      state.status = 'fulfilled';
    },
    [removeProductInBasket.rejected]: (state, action) => {
      state.loading = false;
      state.message = action.payload.error.message;
      state.status = 'fulfilled';
    },
    // Изменение единицы товара
    [decrementProduct.pending]: state => {
      state.loading = true;
      state.message = null;
      state.status = 'pending';
    },
    [decrementProduct.fulfilled]: (state, action) => {
      const index = state.products.findIndex(product => {
        return product.productId === action.payload.productId;
      });
      if (index) {
        state.products[index] = action.payload;
      } else {
        state.products.push(action.payload);
      }
      state.loading = false;
      state.message = action.payload.message;
      state.status = 'fulfilled';
    },
    [decrementProduct.rejected]: (state, action) => {
      state.loading = false;
      state.message = action.payload.error.message;
      state.status = 'fulfilled';
    }
  }
});

export default basketSlice.reducer;
