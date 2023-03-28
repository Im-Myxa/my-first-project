import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { tokenIsValid } from '../../store/features/auth/authSlice';
import { getUser } from '../../store/features/user/userSlice';
import UserOrderMenu from './orderMenu';
import SettingsMenu from './settingsMenu';

const UserPage = () => {
  const [show, setShow] = useState(false);
  const [user, setUser] = useState('');

  const { userId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getUserMe = useCallback(async () => {
    const { payload } = await dispatch(getUser(userId));
    await dispatch(tokenIsValid());

    setUser(payload);
  }, [userId]);

  useEffect(() => {
    getUserMe();
  }, []);

  if (user && user._id !== userId) {
    return navigate('/products');
  }

  if (!user) return <div>Загрузка...</div>;

  return (
    <div className='mx-auto mt-16 lg:w-[700px] sm:w-96'>
      <div className='w-full border-b border-main/[0.2] py-2'>
        <div className='text-2xl'>{user.name}</div>
      </div>
      <div className='my-6 lg:flex sm:grid sm:space-y-4'>
        <div className='w-1/4 gap-3 sm:flex sm:w-full sm:justify-center sm:gap-8'>
          <div>
            <button
              onClick={() => setShow({ menu: 'settings' })}
              className='rounded-lg p-2 hover:bg-main/[0.2]'
            >
              Настройки
            </button>
          </div>
          <div>
            <button
              onClick={() => setShow({ menu: 'order' })}
              className='rounded-lg p-2 hover:bg-main/[0.2]'
            >
              Мои заказы
            </button>
          </div>
        </div>
        <div className='mx-auto w-3/4 sm:w-96'>
          {show.menu === 'settings' && <SettingsMenu />}
          {show.menu === 'order' && <UserOrderMenu />}
        </div>
      </div>
    </div>
  );
};

export default UserPage;
