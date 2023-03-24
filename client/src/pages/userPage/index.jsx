import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
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
    setUser(payload);
  }, [userId]);

  useEffect(() => {
    getUserMe();
  }, []);

  if (user && user._id !== userId) {
    return navigate('/');
  }

  if (!user) return <div>Загрузка...</div>;

  return (
    <div className='mt-16'>
      <div className='w-full border-b border-main/[0.2] py-2'>
        <div className='text-2xl'>{user.name}</div>
      </div>
      <div className='my-6 flex'>
        <div className='w-1/4 space-y-3'>
          <div>
            <button onClick={() => setShow({ menu: 'settings' })}>
              Настройки
            </button>
          </div>
          <div>
            <button onClick={() => setShow({ menu: 'order' })}>
              Мои заказы
            </button>
          </div>
        </div>
        <div className='w-3/4'>
          {show.menu === 'settings' && <SettingsMenu />}
          {show.menu === 'order' && <UserOrderMenu />}
        </div>
      </div>
    </div>
  );
};

export default UserPage;
