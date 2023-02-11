import React from 'react';
import { Navigate } from 'react-router-dom';
import ProductsLayout from './layouts/productsLayout';
import ServicesLayout from './layouts/servicesLayout';
import Home from './pages/home';
import ProductPage from './pages/productPage';
import ProductsList from './pages/productsList';
import ServicePage from './pages/servicePage';
import ServicesList from './pages/servicesList';

const routes = () => [
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/products',
    element: <ProductsLayout />,
    children: [
      { path: '', element: <ProductsList /> },
      { path: ':productId', element: <ProductPage /> }
    ]
  },
  {
    path: '/services',
    element: <ServicesLayout />,
    children: [
      { path: '', element: <ServicesList /> },
      { path: ':serviceId', element: <ServicePage /> }
    ]
  },
  {
    path: '*',
    element: <Navigate to='/' />
  }
];

export default routes;
