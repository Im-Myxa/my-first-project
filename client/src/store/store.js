import { configureStore } from '@reduxjs/toolkit';
import authSlice from './features/auth/authSlice';
import basketSlice from './features/basket/basketSlice';
import categorySlice from './features/category/categorySlice';
import masterSlice from './features/master/masterSlice';
import productSlice from './features/product/productSlice';
import serviceSlice from './features/service/serviceSlice';
import userSlice from './features/user/userSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    product: productSlice,
    category: categorySlice,
    master: masterSlice,
    service: serviceSlice,
    user: userSlice,
    basket: basketSlice
  }
});
