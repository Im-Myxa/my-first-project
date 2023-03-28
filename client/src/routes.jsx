import React from 'react';
import { Navigate } from 'react-router-dom';
import AuthLayout from './layouts/authLayout';
import ProductsLayout from './layouts/productsLayout';
import AdminPage from './pages/adminPage';
import BasketPage from './pages/basketPage';
import LoginForm from './pages/loginForm';
import ProductPage from './pages/productPage';
import ProductsListPage from './pages/productsListPage';
import RegisterForm from './pages/registerForm';

import UserPage from './pages/userPage';

const routes = () => [
  // {
  //   path: '/',
  //   element: <Home />
  // },
  {
    path: '/adminPage',
    element: <AdminPage />
  },
  {
    path: '/products',
    element: <ProductsLayout />,
    children: [
      { path: '', element: <ProductsListPage /> },
      { path: ':productId', element: <ProductPage /> }
    ]
  },
  // {
  //   path: '/services',
  //   element: <ServicesLayout />,
  //   children: [
  //     { path: '', element: <ServicesListPage /> },
  //     { path: ':serviceId', element: <ServicePage /> }
  //   ]
  // },
  {
    path: '/basket/:userId?',
    element: <BasketPage />
  },
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      { path: 'signIn', element: <LoginForm /> },
      { path: 'signUp', element: <RegisterForm /> }
    ]
  },
  {
    path: '/user/:userId',
    element: <UserPage />
  },
  {
    path: '*',
    element: <Navigate to='/products' />
  }
];

export default routes;
