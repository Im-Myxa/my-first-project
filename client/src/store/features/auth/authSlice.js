import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../services/axios';

const initialState = {
  user: null,
  status: null,
  isLoading: false,
  token: null
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
    const response = await axios.get('/auth/me');
    return response.data;
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
      state.isLoading = false;
      state.token = null;
    }
  },
  extraReducers: {
    [registerUser.pending]: state => {
      state.isLoading = true;
      state.status = null;
    },
    [registerUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.status = action.payload.message;
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    [registerUser.rejected]: (state, action) => {
      state.status = action.error.message;
      state.isLoading = false;
    },
    [loginUser.pending]: state => {
      state.isLoading = true;
      state.status = null;
    },
    [loginUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.status = action.payload.message;
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    [loginUser.rejected]: (state, action) => {
      state.status = action.error.message;
      state.isLoading = false;
    },
    [tokenIsValid.pending]: state => {
      state.isLoading = true;
      state.status = null;
    },
    [tokenIsValid.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.status = null;
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    [tokenIsValid.rejected]: (state, action) => {
      state.status = action.error.message;
      state.isLoading = false;
    }
  }
});

export const checkIsAuth = state => Boolean(state.auth.token);

export const { logOut } = authSlice.actions;

export default authSlice.reducer;
