import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { checkIsAuth, registerUser } from '../../store/features/auth/authSlice';
import { toast } from 'react-toastify';

const RegisterForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { status } = useSelector(state => state.auth);
  const isAuth = useSelector(checkIsAuth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (status) {
      toast.info(status);
    }
    if (isAuth) navigate('/');
  }, [status, isAuth, navigate]);

  const handleSubmit = () => {
    try {
      dispatch(registerUser({ name, email, password }));
      setName('');
      setEmail('');
      setPassword('');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12'>
      <div className='relative py-3 sm:max-w-xl sm:mx-auto'>
        <div className='absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl'></div>
        <div className='relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20'>
          <div className='max-w-md mx-auto'>
            <div>
              <h1 className='text-2xl font-semibold'>Регистрация</h1>
            </div>
            <div className='divide-y divide-gray-200'>
              <div className='py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7'>
                <div className='relative'>
                  <input
                    autoComplete='off'
                    id='name'
                    name='name'
                    type='text'
                    value={name}
                    onChange={event => setName(event.target.value)}
                    className='peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600'
                    placeholder='Имя'
                  />
                  <label
                    htmlFor='name'
                    className='absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm'
                  >
                    Имя
                  </label>
                </div>
                <div className='relative'>
                  <input
                    autoComplete='off'
                    id='email'
                    name='email'
                    type='text'
                    value={email}
                    onChange={event => setEmail(event.target.value)}
                    className='peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600'
                    placeholder='Email'
                  />
                  <label
                    htmlFor='email'
                    className='absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm'
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
                    className='peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600'
                    placeholder='Пароль'
                  />
                  <label
                    htmlFor='password'
                    className='absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm'
                  >
                    Пароль
                  </label>
                </div>
                <div className='flex relative justify-between'>
                  <button
                    className='bg-blue-500 text-white rounded-md px-2 py-1'
                    onClick={handleSubmit}
                  >
                    Войти
                  </button>
                  <NavLink to='/auth/signIn'>Есть аккаунт?</NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
