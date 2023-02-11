import React from 'react';
import { Outlet } from 'react-router-dom';

const ProductsLayout = () => {
  return (
    <div className='content-center'>
      <Outlet />
    </div>
  );
};

export default ProductsLayout;
