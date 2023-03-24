import React from 'react';
import { Navigate } from 'react-router-dom';
import AuthLayout from './layouts/authLayout';
import ProductsLayout from './layouts/productsLayout';
import ServicesLayout from './layouts/servicesLayout';
import AdminPage from './pages/adminPage';
import Basket from './pages/basketPage';
import Home from './pages/homePage';
import LoginForm from './pages/loginForm';
import OrdersPage from './pages/ordersPage';
import ProductPage from './pages/productPage';
import ProductsListPage from './pages/productsListPage';
import RecordsPage from './pages/recordsPage';
import RegisterForm from './pages/registerForm';
import ServicePage from './pages/servicePage';
import ServicesListPage from './pages/servicesListPage';
import UserPage from './pages/userPage';

const routes = () => [
  {
    path: '/',
    element: <Home />
  },
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
  {
    path: '/services',
    element: <ServicesLayout />,
    children: [
      { path: '', element: <ServicesListPage /> },
      { path: ':serviceId', element: <ServicePage /> }
    ]
  },
  {
    path: '/basket/:userId?',
    element: <Basket />
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
    path: '/orders',
    element: <OrdersPage />
  },
  {
    path: '/records',
    element: <RecordsPage />
  },
  {
    path: '*',
    element: <Navigate to='/' />
  }
];

export default routes;
