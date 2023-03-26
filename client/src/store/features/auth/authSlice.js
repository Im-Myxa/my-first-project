import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../services/axios';

const initialState = {
  user: null,
  status: null,
  loading: false,
  token: null,
  message: null
};

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async ({ name, email, password }) => {
    try {
      const response = await axios.post('/auth/signUp', {
        name,
        email,
        password
      });
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      return response.data;
    } catch (error) {
      return error;
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }) => {
    try {
      const response = await axios.post('/auth/signIn', {
        email,
        password
      });
      if (response.data.token) {
        window.localStorage.setItem('token', response.data.token);
      }
      return response.data;
    } catch (error) {
      return error;
    }
  }
);

export const tokenIsValid = createAsyncThunk('auth/tokenIsValid', async () => {
  try {
    const { data } = await axios.get('/auth/me');
    return data;
  } catch (error) {
    return error;
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logOut: state => {
      state.user = null;
      state.status = null;
      state.loading = false;
      state.token = null;
      state.message = null;
    }
  },
  extraReducers: {
    // Регистрация пользователя
    [registerUser.pending]: state => {
      state.loading = true;
      state.status = 'pending';
      state.message = null;
    },
    [registerUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.status = 'fulfilled';
      state.message = action.payload.message;
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    [registerUser.rejected]: (state, action) => {
      state.status = 'rejected';
      state.message = action.error.message;
      state.loading = false;
    },
    //Логин пользователя
    [loginUser.pending]: state => {
      state.loading = true;
      state.status = 'pending';
      state.message = null;
    },
    [loginUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.status = 'fulfilled';
      state.message = action.payload.message;
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    [loginUser.rejected]: (state, action) => {
      state.status = 'rejected';
      state.message = action.error.message;
      state.loading = false;
    },
    // Проверка на валидность токена
    [tokenIsValid.pending]: state => {
      state.loading = true;
      state.status = 'pending';
      state.message = null;
    },
    [tokenIsValid.fulfilled]: (state, action) => {
      state.loading = false;
      state.status = 'fulfilled';
      state.message = null;
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    [tokenIsValid.rejected]: (state, action) => {
      state.status = 'rejected';
      state.message = action.error.message;
      state.loading = false;
    }
  }
});

export const checkIsAuth = state => Boolean(state.auth.token);
export const checkIsAdmin = state => state.auth.user;

export const { logOut } = authSlice.actions;

export default authSlice.reducer;
