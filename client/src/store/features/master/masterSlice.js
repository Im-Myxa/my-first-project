import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../services/axios';

const initialState = {
  masters: [],
  loading: false,
  status: null,
  message: null
};

export const getAllMaster = createAsyncThunk(
  'master/getAllMaster',
  async () => {
    try {
      const { data } = await axios.get('/masters');
      return data;
    } catch (error) {
      return error.data;
    }
  }
);

export const createMaster = createAsyncThunk(
  'master/createMaster',
  async newMaster => {
    try {
      const { data } = await axios.post('/masters', newMaster);
      return data;
    } catch (error) {
      return error.data;
    }
  }
);

export const removeMaster = createAsyncThunk(
  'master/removeMaster',
  async masterId => {
    try {
      const { data } = await axios.delete(`/masters/${masterId}`, masterId);
      return data;
    } catch (error) {
      return error.data;
    }
  }
);

export const editMaster = createAsyncThunk(
  'master/editMaster',
  async editedMaster => {
    try {
      const { data } = await axios.patch(
        `/masters/${editedMaster.get('_id')}`,
        editedMaster
      );
      return data;
    } catch (error) {
      return error.data;
    }
  }
);

export const masterSlice = createSlice({
  name: 'master',
  initialState,
  reducers: {},
  extraReducers: {
    //Получение всех мастеров
    [getAllMaster.pending]: state => {
      state.loading = true;
      state.status = 'pending';
      state.message = null;
    },
    [getAllMaster.fulfilled]: (state, action) => {
      state.masters = action.payload;
      state.loading = false;
      state.status = 'fulfilled';
      state.message = null;
    },
    [getAllMaster.rejected]: (state, action) => {
      state.loading = false;
      state.message = action.payload.error.message;
      state.status = 'rejected';
    },
    // Создание мастера
    [createMaster.pending]: state => {
      state.loading = true;
      state.message = null;
      state.status = 'pending';
    },
    [createMaster.fulfilled]: (state, action) => {
      state.masters.push(action.payload);
      state.loading = false;
      state.message = action.payload.message;
      state.status = 'fulfilled';
    },
    [createMaster.rejected]: (state, action) => {
      state.loading = false;
      state.message = action.payload.error.message;
      state.status = 'fulfilled';
    },
    // Удаление мастера
    [removeMaster.pending]: state => {
      state.loading = true;
      state.message = null;
      state.status = 'pending';
    },
    [removeMaster.fulfilled]: (state, action) => {
      state.masters = state.masters.filter(master => {
        return master._id !== action.payload._id;
      });
      state.loading = false;
      state.message = action.payload.message;
      state.status = 'fulfilled';
    },
    [removeMaster.rejected]: (state, action) => {
      state.loading = false;
      state.message = action.payload.error.message;
      state.status = 'fulfilled';
    },
    // Изменение мастера
    [editMaster.pending]: state => {
      state.loading = true;
      state.message = null;
      state.status = 'pending';
    },
    [editMaster.fulfilled]: (state, action) => {
      const index = state.masters.findIndex(master => {
        return master._id === action.payload._id;
      });
      state.masters[index] = action.payload;
      state.loading = false;
      state.message = action.payload.message;
      state.status = 'fulfilled';
    },
    [editMaster.rejected]: (state, action) => {
      state.loading = false;
      state.message = action.payload.error.message;
      state.status = 'fulfilled';
    }
  }
});

export const messageMaster = state => state.master.message;

export default masterSlice.reducer;
