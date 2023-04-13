import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../services/axios';

const initialState = {
  products: [],
  loading: false,
  status: null,
  message: null,
  quantityProducts: 0,
  sumProd: 0
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
  async addProduct => {
    try {
      const { data } = await axios.post(
        `/basket/${addProduct.userId}`,
        addProduct
      );
      return data;
    } catch (error) {
      return error.data;
    }
  }
);

export const removeProductInBasket = createAsyncThunk(
  'basket/removeProductInBasket',
  async productId => {
    try {
      const { data } = await axios.delete(`/basket/${productId}`);

      return data;
    } catch (error) {
      return error.data;
    }
  }
);

export const removeBasket = createAsyncThunk(
  'basket/removeBasket',
  async () => {
    try {
      const { data } = await axios.delete(`/basket`);
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
      state.products = action.payload.products;
      state.quantityProducts = action.payload.products.length;
      const arr = action.payload.products.map(prod => {
        return prod.price * prod.quantity;
      });
      state.sumProd = arr.reduce((acc, curr) => acc + curr, 0);
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
      state.products = action.payload.products;
      state.quantityProducts = action.payload.products.length;
      const arr = action.payload.products.map(prod => {
        return prod.price * prod.quantity;
      });
      state.sumProd = arr.reduce((acc, curr) => acc + curr, 0);
      state.loading = false;
      state.status = 'fulfilled';
    },
    [addProductInBasket.rejected]: (state, action) => {
      state.loading = false;
      state.message = action.payload.error.message;
      state.status = 'rejected';
    },
    // Удаление товара из корзины
    [removeProductInBasket.pending]: state => {
      state.loading = true;
      state.message = null;
      state.status = 'pending';
    },
    [removeProductInBasket.fulfilled]: (state, action) => {
      const products = state.products.filter(prod => {
        return prod._id !== action.payload.removed._id;
      });
      state.products = products;
      state.quantityProducts = products.length;

      const arr = products.map(prod => {
        return prod.price * prod.quantity;
      });
      state.sumProd = arr.reduce((acc, curr) => acc + curr, 0);

      state.loading = false;
      state.message = action.payload.message;
      state.status = 'fulfilled';
    },
    [removeProductInBasket.rejected]: (state, action) => {
      state.loading = false;
      state.message = action.error.message;
      state.status = 'rejected';
    },
    // Удаление корзины
    [removeBasket.pending]: state => {
      state.loading = true;
      state.message = null;
      state.status = 'pending';
    },
    [removeBasket.fulfilled]: (state, action) => {
      state.products.splice(0);
      state.quantityProducts = 0;
      state.sumProd = 0;
      state.loading = false;
      state.message = action.payload.message;
      state.status = 'fulfilled';
    },
    [removeBasket.rejected]: (state, action) => {
      state.loading = false;
      state.message = action.error.message;
      state.status = 'rejected';
    },
    // Изменение единицы товара
    [decrementProduct.pending]: state => {
      state.loading = true;
      state.message = null;
      state.status = 'pending';
    },
    [decrementProduct.fulfilled]: (state, action) => {
      const index = state.products.findIndex(prod => {
        return prod._id === action.payload._id;
      });
      state.products[index] = action.payload;

      const arr = state.products.map(prod => {
        return prod.price * prod.quantity;
      });
      state.sumProd = arr.reduce((acc, curr) => acc + curr, 0);

      state.loading = false;
      state.status = 'fulfilled';
    },
    [decrementProduct.rejected]: (state, action) => {
      state.loading = false;
      state.message = action.payload.error.message;
      state.status = 'rejected';
    }
  }
});

export default basketSlice.reducer;
