import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { checkIsAuth, logOut } from '../../store/features/auth/authSlice';
import MenuCloseIcon from './MenuCloseIcon';
import MenuIcon from './MenuIcon';
import MobilMenu from './MobilMenu';
import NavItem from './NavItem';
import NavLogo from './NavLogo';

const NavBar = () => {
  const [isMobilMenuOpen, setMobilMenuOpen] = useState(false);

  const isAuth = useSelector(checkIsAuth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogOut = () => {
    dispatch(logOut());
    window.localStorage.removeItem('token');
    toast.info('Вы вышли из системы');
    navigate('/');
  };

  return (
    <header className='flex items-center'>
      <NavLogo />
      <nav className='hidden md:flex space-x-10 ml-auto'>
        <NavItem text='Главная' navigate={'/'} />
        <NavItem text='Услуги' navigate={'/services'} />
        <NavItem text='Товары' navigate={'/products'} />
        <NavItem text='Корзина' navigate={'/basket/:userId?'} />
        {isAuth ? (
          <NavItem text='Выйти' onLogOut={handleLogOut} navigate={null} />
        ) : (
          <NavItem text='Войти' navigate={'/auth/signIn'} />
        )}
      </nav>
      <div
        className='flex md:hidden ml-auto cursor-pointer z-30'
        onClick={() => setMobilMenuOpen(!isMobilMenuOpen)}
      >
        {isMobilMenuOpen ? <MenuCloseIcon /> : <MenuIcon />}
      </div>
      <MobilMenu isOpen={isMobilMenuOpen} />
    </header>
  );
};

export default NavBar;
