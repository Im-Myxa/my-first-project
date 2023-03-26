import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../services/axios';

const initialState = {
  orders: [],
  loading: false,
  status: null,
  message: null
};

export const getAllOrders = createAsyncThunk('order/getAllOrders', async () => {
  try {
    const { data } = await axios.get(`/orders`);
    return data;
  } catch (error) {
    return error.data;
  }
});

export const getAllOrdersByUser = createAsyncThunk(
  'order/getAllOrdersByUser',
  async userId => {
    try {
      const { data } = await axios.get(`/orders/${userId}`);
      return data;
    } catch (error) {
      return error.data;
    }
  }
);

export const createOrder = createAsyncThunk(
  'order/createOrder',
  async createdOrder => {
    try {
      const { data } = await axios.post(`/orders`, createdOrder);
      return data;
    } catch (error) {
      return error.data;
    }
  }
);

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  extraReducers: {
    //Получение всех заказов
    [getAllOrders.pending]: state => {
      state.loading = true;
      state.status = 'pending';
      state.message = null;
    },
    [getAllOrders.fulfilled]: (state, action) => {
      state.products = action.payload.products;
      state.loading = false;
      state.status = 'fulfilled';
      state.message = null;
    },
    [getAllOrders.rejected]: (state, action) => {
      state.loading = false;
      state.message = action.payload.error.message;
      state.status = 'rejected';
    },
    //Получение всех заказов пользователя
    [getAllOrdersByUser.pending]: state => {
      state.loading = true;
      state.status = 'pending';
      state.message = null;
    },
    [getAllOrdersByUser.fulfilled]: (state, action) => {
      state.products = action.payload.products;
      state.loading = false;
      state.status = 'fulfilled';
      state.message = null;
    },
    [getAllOrdersByUser.rejected]: (state, action) => {
      state.loading = false;
      state.message = action.payload.error.message;
      state.status = 'rejected';
    },
    // Создание заказа
    [createOrder.pending]: state => {
      state.loading = true;
      state.message = null;
      state.status = 'pending';
    },
    [createOrder.fulfilled]: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.status = 'fulfilled';
    },
    [createOrder.rejected]: (state, action) => {
      state.loading = false;
      state.message = action.payload.error.message;
      state.status = 'rejected';
    }
  }
});

export default orderSlice.reducer;
