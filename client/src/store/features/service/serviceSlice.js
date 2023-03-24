import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../services/axios';

const initialState = {
  services: [],
  loading: false,
  status: null,
  message: null
};

export const getAllServices = createAsyncThunk(
  'service/getAllServices',
  async () => {
    try {
      const { data } = await axios.get('/services');
      return data;
    } catch (error) {
      return error.data;
    }
  }
);

export const createService = createAsyncThunk(
  'service/createService',
  async newService => {
    try {
      const { data } = await axios.post('/services', newService);
      return data;
    } catch (error) {
      return error.data;
    }
  }
);

export const removeService = createAsyncThunk(
  'service/removeService',
  async serviceId => {
    try {
      const { data } = await axios.delete(`/services/${serviceId}`, serviceId);
      return data;
    } catch (error) {
      return error.data;
    }
  }
);

export const editService = createAsyncThunk(
  'service/editService',
  async editedService => {
    try {
      const { data } = await axios.patch(
        `/services/${editedService.get('_id')}`,
        editedService
      );
      return data;
    } catch (error) {
      return error.data;
    }
  }
);

export const serviceSlice = createSlice({
  name: 'service',
  initialState,
  reducers: {},
  extraReducers: {
    //Получение всех услуг
    [getAllServices.pending]: state => {
      state.loading = true;
      state.status = 'pending';
      state.message = null;
    },
    [getAllServices.fulfilled]: (state, action) => {
      state.services = action.payload;
      state.loading = false;
      state.status = 'fulfilled';
      state.message = null;
    },
    [getAllServices.rejected]: (state, action) => {
      state.loading = false;
      state.message = action.payload.error.message;
      state.status = 'rejected';
    },
    // Создание услуги
    [createService.pending]: state => {
      state.loading = true;
      state.message = null;
      state.status = 'pending';
    },
    [createService.fulfilled]: (state, action) => {
      state.services.push(action.payload);
      state.loading = false;
      state.message = action.payload.message;
      state.status = 'fulfilled';
    },
    [createService.rejected]: (state, action) => {
      state.loading = false;
      state.message = action.payload.error.message;
      state.status = 'fulfilled';
    },
    // Удаление услуги
    [removeService.pending]: state => {
      state.loading = true;
      state.message = null;
      state.status = 'pending';
    },
    [removeService.fulfilled]: (state, action) => {
      state.services = state.services.filter(service => {
        return service._id !== action.payload._id;
      });
      state.loading = false;
      state.message = action.payload.message;
      state.status = 'fulfilled';
    },
    [removeService.rejected]: (state, action) => {
      state.loading = false;
      state.message = action.payload.error.message;
      state.status = 'fulfilled';
    },
    // Изменение услуги
    [editService.pending]: state => {
      state.loading = true;
      state.message = null;
      state.status = 'pending';
    },
    [editService.fulfilled]: (state, action) => {
      const index = state.services.findIndex(service => {
        return service._id === action.payload._id;
      });
      state.services[index] = action.payload;
      state.loading = false;
      state.message = action.payload.message;
      state.status = 'fulfilled';
    },
    [editService.rejected]: (state, action) => {
      state.loading = false;
      state.message = action.payload.error.message;
      state.status = 'fulfilled';
    }
  }
});

export const messageService = state => state.service.message;

export default serviceSlice.reducer;
