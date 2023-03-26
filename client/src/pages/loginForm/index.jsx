import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  checkIsAuth,
  loginUser,
  tokenIsValid
} from '../../store/features/auth/authSlice';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { status } = useSelector(state => state.auth);
  const isAuth = useSelector(checkIsAuth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth) navigate('/');
  }, [status, isAuth, navigate]);

  const handleSubmit = async () => {
    try {
      await dispatch(loginUser({ email, password }));
      await dispatch(tokenIsValid());
      setEmail('');
      setPassword('');
    } catch (error) {
      return error;
    }
  };
  return (
    <div className='container mx-auto flex min-h-screen flex-col justify-center bg-white py-6 sm:py-12'>
      <div className='relative py-3 sm:mx-auto sm:max-w-xl'>
        <div className='absolute inset-0 -skew-y-6 transform bg-gradient-to-r from-[#2C3E50] to-[#000000] shadow-lg sm:-rotate-6 sm:skew-y-0 sm:rounded-3xl'></div>
        <div className='relative bg-white px-4 py-10 shadow-lg sm:rounded-3xl sm:p-20'>
          <div className='mx-auto max-w-md'>
            <div>
              <h1 className='text-2xl font-semibold'>Авторизация</h1>
            </div>
            <div className='divide-y divide-gray-200'>
              <div className='space-y-4 py-8 text-base leading-6 text-gray-700 sm:text-lg sm:leading-7'>
                <div className='relative'>
                  <input
                    autoComplete='off'
                    id='email'
                    name='email'
                    type='text'
                    value={email}
                    onChange={event => setEmail(event.target.value)}
                    className='focus:borer-rose-600 peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none'
                    placeholder='Email'
                  />
                  <label
                    htmlFor='email'
                    className='peer-placeholder-shown:text-gray-440 absolute left-0 -top-3.5 text-sm text-gray-600 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-gray-600'
                  >
                    Email
                  </label>
                </div>
                <div className='relative'>
                  <input
                    autoComplete='off'
                    id='password'
                    name='password'
                    type='password'
                    value={password}
                    onChange={event => setPassword(event.target.value)}
                    className='focus:borer-rose-600 peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none'
                    placeholder='Пароль'
                  />
                  <label
                    htmlFor='password'
                    className='peer-placeholder-shown:text-gray-440 absolute left-0 -top-3.5 text-sm text-gray-600 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-gray-600'
                  >
                    Пароль
                  </label>
                </div>
                <div className='relative flex justify-between'>
                  <button
                    onClick={handleSubmit}
                    className='rounded-md border border-main bg-white px-2 py-1 text-main hover:bg-main hover:text-white'
                  >
                    Войти
                  </button>
                  <NavLink to='/auth/signUp'>
                    <p className='hover:text-main'>Нет аккаунта?</p>
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
