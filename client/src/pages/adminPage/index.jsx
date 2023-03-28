import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { tokenIsValid } from '../../store/features/auth/authSlice';
import CategoryMenu from './categoryMenu';
import CategoryIcon from './icons/categoryIcon';
import MastersIcon from './icons/mastersIcon';
import OrderIcon from './icons/orderIcon';
import ProductIcon from './icons/productIcon';
import RecordIcon from './icons/recordIcon';
import ServiceIcon from './icons/serviceIcon';
import MasterMenu from './masterMenu';
import GetAllOrders from './orderMenu';
import ProductMenu from './productMenu';
import ServiceMenu from './serviceMenu';

const AdminPage = () => {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAdmin } = useSelector(state => state.auth);

  const getAdmin = useCallback(async () => {
    await dispatch(tokenIsValid());
  }, []);

  useEffect(() => {
    getAdmin();
  }, []);

  if (!isAdmin) {
    return navigate('/products');
  }

  return (
    <div className='font-mill mt-16 flex space-x-10 text-lg'>
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
              <ProductIcon />
              <span className='leading-6'>Товары</span>
            </button>
          </li>
          <li>
            <button
              className='mt-2 flex w-full items-center gap-6 rounded-[10px] py-2 px-3 hover:bg-main/[0.1]'
              onClick={() => setShow({ menu: 'service' })}
            >
              <ServiceIcon />
              <span className='leading-6'>Услуги</span>
            </button>
          </li>
          <li>
            <button
              className='mt-2 flex w-full items-center gap-6 rounded-[10px] py-2 px-3 hover:bg-main/[0.1]'
              onClick={() => setShow({ menu: 'category' })}
            >
              <CategoryIcon />
              <span className='leading-6'>Категории</span>
            </button>
          </li>
          <li>
            <button
              className='mt-2 flex w-full items-center gap-6 rounded-[10px] py-2 px-3 hover:bg-main/[0.1]'
              onClick={() => setShow({ menu: 'master' })}
            >
              <MastersIcon />
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
              <OrderIcon />
              <span className='leading-6'>Заказы</span>
            </button>
          </li>
          <li>
            <button
              className='mt-2 flex w-full items-center gap-6 rounded-[10px] py-2 px-3 hover:bg-main/[0.1]'
              onClick={() => setShow({ menu: 'record' })}
            >
              <RecordIcon />
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
