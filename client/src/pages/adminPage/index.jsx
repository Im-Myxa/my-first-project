import React, { useState } from 'react';
// import {
//   GrBasket,
//   GrCodeSandbox,
//   GrProjects,
//   GrYoga,
//   GrTask,
//   GrServicePlay
// } from 'react-icons/gr';
import CategoryMenu from './categoryMenu';
import MasterMenu from './masterMenu';
import GetAllOrders from './orderMenu';
import ProductMenu from './productMenu';
import ServiceMenu from './serviceMenu';

const AdminPage = () => {
  const [show, setShow] = useState(false);

  return (
    <div className='mt-16 flex space-x-10 font-mill text-lg'>
      <div className='w-1/5'>
        <h1 className='items-center border-b border-main/[0.2] py-2 pl-3 text-2xl font-bold'>
          Админ панель
        </h1>
        <ul className='border-b border-main/[0.2]'>
          <li>
            <button
              className='mt-2 flex w-full items-center gap-6 rounded-[10px] py-2 px-3 hover:bg-main/[0.1]'
              onClick={() => setShow({ menu: 'product' })}
            >
              {/* <GrBasket /> */}
              <span className='leading-6'>Товары</span>
            </button>
          </li>
          <li>
            <button
              className='mt-2 flex w-full items-center gap-6 rounded-[10px] py-2 px-3 hover:bg-main/[0.1]'
              onClick={() => setShow({ menu: 'service' })}
            >
              {/* <GrServicePlay /> */}
              <span className='leading-6'>Услуги</span>
            </button>
          </li>
          <li>
            <button
              className='mt-2 flex w-full items-center gap-6 rounded-[10px] py-2 px-3 hover:bg-main/[0.1]'
              onClick={() => setShow({ menu: 'category' })}
            >
              {/* <GrProjects /> */}
              <span className='leading-6'>Категории</span>
            </button>
          </li>
          <li>
            <button
              className='mt-2 flex w-full items-center gap-6 rounded-[10px] py-2 px-3 hover:bg-main/[0.1]'
              onClick={() => setShow({ menu: 'master' })}
            >
              {/* <GrYoga /> */}
              <span className='leading-6'>Мастера</span>
            </button>
          </li>
        </ul>
        <ul className='border-b border-main/[0.2] text-lg'>
          <li>
            <button
              className='mt-2 flex w-full items-center gap-6 rounded-[10px] py-2 px-3 hover:bg-main/[0.1]'
              onClick={() => setShow({ menu: 'order' })}
            >
              {/* <GrCodeSandbox /> */}
              <span className='leading-6'>Заказы</span>
            </button>
          </li>
          <li>
            <button
              className='mt-2 flex w-full items-center gap-6 rounded-[10px] py-2 px-3 hover:bg-main/[0.1]'
              onClick={() => setShow({ menu: 'record' })}
            >
              {/* <GrTask /> */}
              <span className='leading-6'>Записи</span>
            </button>
          </li>
        </ul>
      </div>
      {show.menu === 'product' && <ProductMenu />}
      {show.menu === 'category' && <CategoryMenu />}
      {show.menu === 'service' && <ServiceMenu />}
      {show.menu === 'master' && <MasterMenu />}
      {show.menu === 'order' && <GetAllOrders />}
    </div>
  );
};

export default AdminPage;
