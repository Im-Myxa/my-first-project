import React from 'react';
import { Outlet } from 'react-router-dom';

const ProductsLayout = () => {
  return (
    <div>
      ProductsLayout <Outlet />
    </div>
  );
};

export default ProductsLayout;
