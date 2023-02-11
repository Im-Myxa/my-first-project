import React from 'react';
import { Outlet } from 'react-router-dom';

const ServicesLayout = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default ServicesLayout;
