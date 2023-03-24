import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  checkIsAuth,
  logOut,
  tokenIsValid
} from '../../store/features/auth/authSlice';
import MenuCloseIcon from './MenuCloseIcon';
import MenuIcon from './MenuIcon';
import MobilMenu from './MobilMenu';
import NavItem from './NavItem';
import NavLogo from './NavLogo';

const NavBar = () => {
  const [isMobilMenuOpen, setMobilMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const [user, setUser] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getUserMe = useCallback(async () => {
    const { payload } = await dispatch(tokenIsValid());
    setUser(payload.user);
  }, []);

  useEffect(() => {
    getUserMe();
  }, []);

  const isAuth = useSelector(checkIsAuth);

  const handleLogOut = () => {
    dispatch(logOut());
    window.localStorage.removeItem('token');
    toast.info('Вы вышли из системы');
    navigate('/');
  };

  return (
    <header className='relative flex items-center'>
      <NavLogo />
      <nav className='ml-auto hidden space-x-10 md:flex'>
        <NavItem text='Админ панель' navigate={'/adminPage'} />
        <NavItem text='Главная' navigate={'/'} />
        <NavItem text='Услуги' navigate={'/services'} />
        <NavItem text='Товары' navigate={'/products'} />
        <NavItem text='Корзина' navigate={`/basket/${user._id}`} />
        {!isAuth && <NavItem text='Войти' navigate={'/auth/signIn'} />}
      </nav>
      {/* button profile */}
      {isAuth && (
        <div>
          <button
            type='button'
            onClick={() => setProfileOpen(!profileOpen)}
            className='h-9 w-9 overflow-hidden rounded-full'
          >
            <img
              src='https://upload.wikimedia.org/wikipedia/commons/b/bc/Unknown_person.jpg'
              alt='plchldr.co'
            />
          </button>

          {profileOpen && (
            <div className='absolute right-2 mt-1 w-48 divide-y divide-gray-200 rounded-md border border-gray-200 bg-white shadow-md'>
              <div className='flex items-center space-x-2 p-2'>
                <img
                  src='https://upload.wikimedia.org/wikipedia/commons/b/bc/Unknown_person.jpg'
                  alt='plchldr.co'
                  className='h-9 w-9 rounded-full'
                />
                <div className='font-medium'>{user.name}</div>
              </div>

              <div className='flex flex-col space-y-3 p-2'>
                <NavLink
                  to={`/user/${user._id}`}
                  className='transition hover:text-blue-600'
                >
                  <button
                    type='button'
                    onClick={() => setProfileOpen(!profileOpen)}
                  >
                    Профиль
                  </button>
                </NavLink>
              </div>

              <div className='p-2'>
                <button
                  className='flex items-center space-x-2 transition hover:text-blue-600'
                  onClick={handleLogOut}
                >
                  <svg
                    className='h-4 w-4'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1'
                    ></path>
                  </svg>
                  <div>Выйти</div>
                </button>
              </div>
            </div>
          )}
        </div>
      )}
      <div
        className='z-30 ml-auto flex cursor-pointer md:hidden'
        onClick={() => setMobilMenuOpen(!isMobilMenuOpen)}
      >
        {isMobilMenuOpen ? <MenuCloseIcon /> : <MenuIcon />}
      </div>
      <MobilMenu isOpen={isMobilMenuOpen} />
    </header>
  );
};

export default NavBar;
