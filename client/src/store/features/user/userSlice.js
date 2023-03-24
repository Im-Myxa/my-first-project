import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../services/axios';

const initialState = {
  userMe: null,
  loading: false,
  status: null,
  message: null
};

export const getUser = createAsyncThunk('user/getUser', async userId => {
  try {
    const { data } = await axios.get(`/user/${userId}`);
    return data;
  } catch (error) {
    return error.data;
  }
});

export const editUser = createAsyncThunk('user/editUser', async editedUser => {
  try {
    const { data } = await axios.patch(`/user/${editedUser._id}`, editedUser);
    return data;
  } catch (error) {
    return error.data;
  }
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: {
    //Получение пользователя
    [getUser.pending]: state => {
      state.loading = true;
      state.status = 'pending';
      state.message = null;
    },
    [getUser.fulfilled]: (state, action) => {
      state.userMe = action.payload;
      state.loading = false;
      state.status = 'fulfilled';
      state.message = null;
    },
    [getUser.rejected]: (state, action) => {
      state.loading = false;
      state.message = action.payload.error.message;
      state.status = 'rejected';
    },
    // Изменение пользователя
    [editUser.pending]: state => {
      state.loading = true;
      state.message = null;
      state.status = 'pending';
    },
    [editUser.fulfilled]: (state, action) => {
      state.userMe = action.payload;
      state.loading = false;
      state.message = action.payload.message;
      state.status = 'fulfilled';
    },
    [editUser.rejected]: (state, action) => {
      state.loading = false;
      state.message = action.payload.error.message;
      state.status = 'fulfilled';
    }
  }
});

export const messageUser = state => state.user.message;

export default userSlice.reducer;
