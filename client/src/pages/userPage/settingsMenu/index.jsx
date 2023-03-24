import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { editUser, getUser } from '../../../store/features/user/userSlice';

const SettingsMenu = () => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [age, setAge] = useState('');
  const [id, setId] = useState('');

  const dispatch = useDispatch();
  const { userId } = useParams();

  const getUserMe = useCallback(async () => {
    const { payload } = await dispatch(getUser(userId));
    setName(payload.name);
    setSurname(payload.surname);
    setEmail(payload.email);
    setMobile(payload.mobile);
    setAge(payload.age);
    setId(payload._id);
  }, [userId]);

  useEffect(() => {
    getUserMe();
  }, []);

  const handleEditUser = async () => {
    try {
      const editedUser = {
        _id: id,
        name: name,
        surname: surname,
        email: email,
        mobile: mobile,
        age: age
      };

      await dispatch(editUser(editedUser));
      await dispatch(getUser(userId));
    } catch (error) {
      return error;
    }
  };

  return (
    <div className='relative h-[520px] w-full rounded-md border border-main/[0.2]'>
      <form onSubmit={e => e.preventDefault()} className='space-y-4'>
        <div className='flex space-x-4'>
          <div>
            <label className='mb-2'>Имя</label>
            <input
              type='text'
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder='Имя'
              className='mb-2 w-full rounded-lg border bg-main/[0.1] outline-none placeholder:text-gray-700'
            />
          </div>

          <div>
            <label className='mb-2'>Фамилия</label>
            <input
              type='text'
              value={surname}
              onChange={e => setSurname(e.target.value)}
              placeholder='Фамилия'
              className='mb-2 w-full rounded-lg border bg-main/[0.1] outline-none placeholder:text-gray-700'
            />
          </div>
        </div>
        <div className='flex space-x-4'>
          <div>
            <label className='mb-2'>Email</label>
            <input
              type='email'
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder='Email'
              className='mb-2 w-full rounded-lg border bg-main/[0.1] outline-none placeholder:text-gray-700'
            />
          </div>
          <div>
            <label className='mb-2'>Телефон</label>
            <input
              type='text'
              value={mobile}
              onChange={e => setMobile(e.target.value)}
              placeholder='Телефон'
              className='mb-2 w-full rounded-lg border bg-main/[0.1] outline-none placeholder:text-gray-700'
            />
          </div>
        </div>
        <div>
          <label className='mb-2'>Дата рождения</label>
          <input
            type='date'
            value={age}
            onChange={e => setAge(e.target.value)}
            placeholder='Дата рождения'
            className='mb-2 w-full rounded-lg border bg-main/[0.1] outline-none placeholder:text-gray-700'
          />
        </div>
      </form>

      <button
        onClick={handleEditUser}
        className='absolute bottom-2 right-2 rounded-full border border-main p-2 hover:bg-main hover:text-white'
      >
        Сохранить
      </button>
    </div>
  );
};

export default SettingsMenu;
