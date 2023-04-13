import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { logOut } from '../../store/features/auth/authSlice';
import { getBasket } from '../../store/features/basket/basketSlice';
import BasketIcons from './BasketIcons';
import CloseProfileIcon from './closeProfileIcon';
import LoginIcon from './LoginIcon';
import LogoutIcon from './LogOutIcon';
import MenuCloseIcon from './MenuCloseIcon';
import MenuIcon from './MenuIcon';
import MobilMenu from './MobilMenu';
import NavItem from './NavItem';
import NavLogo from './NavLogo';
import ProfileIcons from './ProfileIcons';

const NavBar = () => {
  const [isMobilMenuOpen, setMobilMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const { user, isAdmin, isAuth } = useSelector(state => state.auth);
  const { quantityProducts } = useSelector(state => state.basket);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleBasketLength = async () => {
    await dispatch(getBasket(user._id));
  };

  useEffect(() => {
    handleBasketLength();
  }, [user]);

  const handleLogOut = async () => {
    await dispatch(logOut());
    window.localStorage.removeItem('token');
    navigate('/products');
  };

  return (
    <header className='relative flex h-28 items-center bg-gradient-to-r from-[#2C3E50] to-[#000000] font-roboto'>
      <NavLogo />
      <div className='mx-auto md:hidden'>
        <ul className='flex gap-6'>
          {isAdmin && <NavItem text='Админ панель' navigate={'/adminPage'} />}
          {/* <NavItem text='Главная' navigate={'/'} /> */}
          {/* <NavItem text='Услуги' navigate={'/services'} /> */}
          <NavItem text='Товары' navigate={'/products'} />
        </ul>
      </div>
      <div className='absolute right-4 flex items-center gap-2'>
        {!isAuth ? (
          <div onClick={() => setMobilMenuOpen(false)}>
            <NavLink to={'/auth/signIn'}>
              <LoginIcon />
            </NavLink>
          </div>
        ) : (
          <div className='flex gap-6' onClick={() => setMobilMenuOpen(false)}>
            <button
              type='button'
              onClick={() => setProfileOpen(!profileOpen)}
              className='flex flex-shrink-0 items-center justify-center space-x-2 overflow-hidden rounded-full p-2 hover:bg-white/[0.5]'
            >
              <ProfileIcons />
              <p className='font-medium text-white xs:hidden'>{user.name}</p>
            </button>
            {profileOpen && (
              <div className='absolute top-10 right-[72px] mt-1 w-48 divide-y divide-gray-200 rounded-md border border-gray-200 bg-white shadow-md'>
                <div className='flex items-center justify-between space-x-2 p-2'>
                  <div className='flex'>
                    <ProfileIcons profileOpen={profileOpen} />
                    <div className='font-medium'>{user.name}</div>
                  </div>
                  <div onClick={() => setProfileOpen(false)}>
                    <CloseProfileIcon />
                  </div>
                </div>

                <div
                  className='flex flex-col space-y-3 p-2 hover:bg-main/[0.1]'
                  onClick={() => setProfileOpen(!profileOpen)}
                >
                  <NavLink to={`/user/${user._id}`}>
                    <button
                      type='button'
                      className='cursor-pointer hover:text-opacity-50'
                    >
                      Профиль
                    </button>
                  </NavLink>
                </div>

                <div className='p-2 hover:bg-main/[0.1]'>
                  <button
                    className='flex cursor-pointer items-center space-x-2 hover:text-opacity-50 '
                    onClick={handleLogOut}
                  >
                    <LogoutIcon />
                    <div>Выйти</div>
                  </button>
                </div>
              </div>
            )}
            <NavLink to={`/basket/${user._id}`}>
              <BasketIcons quantityProducts={quantityProducts} />
            </NavLink>
          </div>
        )}
        <div
          className='hidden md:block'
          onClick={() => setMobilMenuOpen(!isMobilMenuOpen)}
        >
          {isMobilMenuOpen ? <MenuCloseIcon /> : <MenuIcon />}
        </div>
        <MobilMenu
          isOpen={isMobilMenuOpen}
          onMobileMenuClose={() => setMobilMenuOpen(false)}
          onLogout={handleLogOut}
          isAdmin={isAdmin}
        />
      </div>
    </header>
  );
};

export default NavBar;
