/* eslint-disable indent */
import React from 'react';
import PropTypes from 'prop-types';
// import NavItem from '../NavItem';
import { useSelector } from 'react-redux';
import { checkIsAuth } from '../../../store/features/auth/authSlice';
import LogoutIcon from '../LogOutIcon';
import { NavLink } from 'react-router-dom';

const MobilMenu = ({
  isOpen = false,
  onLogout,
  isAdmin,
  onMobileMenuClose
}) => {
  const isAuth = useSelector(checkIsAuth);
  return (
    <>
      {isOpen && (
        <nav
          className={`fixed left-0 top-28 right-0 bottom-0 hidden items-center justify-center bg-white py-4 text-main md:block`}
        >
          <ul className='flex flex-col items-center justify-center gap-10 '>
            {isAdmin && (
              <li className='text-3xl'>
                <NavLink to={'/adminPage'} onClick={onMobileMenuClose}>
                  Админ панель
                </NavLink>
              </li>
            )}
            {/* <li className='text-3xl' onClick={onMobileMenuClose}>
              <NavLink to={'/'}>Главная</NavLink>
            </li> */}
            {/* <li className='text-3xl'>
              <NavLink to={'/services'} onClick={onMobileMenuClose}>
                Услуги
              </NavLink>
            </li> */}
            <li className='text-3xl'>
              <NavLink to={'/products'} onClick={onMobileMenuClose}>
                Товары
              </NavLink>
            </li>
            {isAuth && (
              <li className='text-3xl' onClick={onMobileMenuClose}>
                <button
                  className='flex cursor-pointer items-center space-x-2 hover:text-opacity-50 '
                  onClick={onLogout}
                >
                  <LogoutIcon />
                  <div>Выйти</div>
                </button>
              </li>
            )}
          </ul>
        </nav>
      )}
    </>
  );
};

MobilMenu.propTypes = {
  isOpen: PropTypes.bool,
  onLogout: PropTypes.func,
  isAdmin: PropTypes.bool,
  onMobileMenuClose: PropTypes.func
};

export default MobilMenu;
