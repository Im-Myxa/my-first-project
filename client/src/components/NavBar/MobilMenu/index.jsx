import React from 'react';
import PropTypes from 'prop-types';
import NavItem from '../NavItem';
import { useSelector } from 'react-redux';
import { checkIsAuth } from '../../../store/features/auth/authSlice';

const MobilMenu = ({ isOpen = false }) => {
  const isAuth = useSelector(checkIsAuth);
  return (
    <div className='flex md:hidden'>
      <div
        className={`absolute top-0 left-0 right-0 bg-gray-400 opacity-50 z-10 min-h-[150vh] ${
          isOpen ? 'flex' : 'hidden'
        }`}
      />
      <div
        className={`absolute right-0 top-0 w-1/2 bg-white z-20 justify-center min-h-[150vh] ${
          isOpen ? 'flex' : 'hidden'
        }`}
      >
        <nav className='my-20 mx-5 space-y-5 text-lg w-full'>
          <NavItem text='Главная' navigate={'/'} />
          <NavItem text='Услуги' navigate={'/services'} />
          <NavItem text='Товары' navigate={'/products'} />
          <NavItem text='Корзина' navigate={'/basket/:userId?'} />
          {isAuth ? (
            <NavItem text='Выйти' navigate={'/'} />
          ) : (
            <NavItem text='Войти' navigate={'/auth/signIn'} />
          )}
        </nav>
      </div>
    </div>
  );
};

MobilMenu.propTypes = {
  isOpen: PropTypes.bool
};

export default MobilMenu;
