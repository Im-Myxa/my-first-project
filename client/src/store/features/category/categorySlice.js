import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../services/axios';

const initialState = {
  categories: [],
  loading: false,
  status: null,
  message: null
};

export const getAllCategories = createAsyncThunk(
  'category/getAllCategories',
  async () => {
    try {
      const { data } = await axios.get('/categories');
      return data;
    } catch (error) {
      return error.data;
    }
  }
);

export const createCategory = createAsyncThunk(
  'category/createCategory',
  async newCategory => {
    try {
      const { data } = await axios.post('/categories', newCategory);
      return data;
    } catch (error) {
      return error.data;
    }
  }
);

export const removeCategory = createAsyncThunk(
  'category/removeCategory',
  async categoryId => {
    try {
      const { data } = await axios.delete(
        `/categories/${categoryId}`,
        categoryId
      );
      return data;
    } catch (error) {
      return error.data;
    }
  }
);

export const editCategory = createAsyncThunk(
  'category/editCategory',
  async editedCategory => {
    try {
      const { data } = await axios.patch(
        `/categories/${editedCategory.get('_id')}`,
        editedCategory
      );
      return data;
    } catch (error) {
      return error.data;
    }
  }
);

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {},
  extraReducers: {
    //Получение всех категорий
    [getAllCategories.pending]: state => {
      state.loading = true;
      state.status = 'pending';
      state.message = null;
    },
    [getAllCategories.fulfilled]: (state, action) => {
      state.categories = action.payload;
      state.loading = false;
      state.status = 'fulfilled';
      state.message = null;
    },
    [getAllCategories.rejected]: (state, action) => {
      state.loading = false;
      state.message = action.payload.error.message;
      state.status = 'rejected';
    },
    //Создание категорий
    [createCategory.pending]: state => {
      state.loading = true;
      state.status = 'pending';
      state.message = null;
    },
    [createCategory.fulfilled]: (state, action) => {
      state.categories.push(action.payload.category);
      state.loading = false;
      state.status = 'fulfilled';
      state.message = action.payload.message;
    },
    [createCategory.rejected]: (state, action) => {
      state.loading = false;
      state.message = action.payload.error.message;
      state.status = 'rejected';
    },
    // Удаление категории
    [removeCategory.pending]: state => {
      state.loading = true;
      state.message = null;
      state.status = 'pending';
    },
    [removeCategory.fulfilled]: (state, action) => {
      state.categories = state.categories.filter(category => {
        return category._id !== action.meta.arg;
      });
      state.loading = false;
      state.message = action.payload.message;
      state.status = 'fulfilled';
    },
    [removeCategory.rejected]: (state, action) => {
      state.loading = false;
      state.message = action.payload.error.message;
      state.status = 'fulfilled';
    },
    // Изменение категории
    [editCategory.pending]: state => {
      state.loading = true;
      state.message = null;
      state.status = 'pending';
    },
    [editCategory.fulfilled]: (state, action) => {
      const index = state.categories.findIndex(category => {
        return category._id === action.payload.category._id;
      });
      state.categories[index] = action.payload.category;
      state.loading = false;
      state.message = action.payload.message;
      state.status = 'fulfilled';
    },
    [editCategory.rejected]: (state, action) => {
      state.loading = false;
      state.message = action.payload.error.message;
      state.status = 'fulfilled';
    }
  }
});

export const messageCategory = state => state.category.message;

export default categorySlice.reducer;
