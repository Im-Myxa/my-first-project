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
    <div className='h-[420px] w-full rounded-md border border-main/[0.2]'>
      <form onSubmit={e => e.preventDefault()} className='space-y-2'>
        <div className='space-y-2 px-2'>
          <div>
            <label className='mb-2'>Имя</label>
            <input
              type='text'
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder='Имя'
              className='mb-2 w-full rounded-lg border border-main px-2 py-1 outline-none placeholder:text-gray-700'
            />
          </div>

          <div>
            <label className='mb-2'>Фамилия</label>
            <input
              type='text'
              value={surname}
              onChange={e => setSurname(e.target.value)}
              placeholder='Фамилия'
              className='mb-2 w-full rounded-lg border border-main px-2 py-1 outline-none placeholder:text-gray-700'
            />
          </div>
        </div>
        <div className='space-y-2 px-2'>
          <div>
            <label className='mb-2'>Email</label>
            <input
              type='email'
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder='Email'
              className='mb-2 w-full rounded-lg border border-main px-2 py-1 outline-none placeholder:text-gray-700'
            />
          </div>
          <div>
            <label className='mb-2'>Телефон</label>
            <input
              type='text'
              value={mobile}
              onChange={e => setMobile(e.target.value)}
              placeholder='Телефон'
              className='mb-2 w-full rounded-lg border border-main px-2 py-1 outline-none placeholder:text-gray-700'
            />
          </div>
        </div>
        <div className='flex items-center gap-4 px-2'>
          <label className='mb-2'>Дата рождения</label>
          <input
            type='date'
            value={age}
            onChange={e => setAge(e.target.value)}
            placeholder='Дата рождения'
            className='mb-2 w-[200px] rounded-lg border border-main px-2 py-1 outline-none placeholder:text-gray-700'
          />
        </div>
      </form>

      <button
        onClick={handleEditUser}
        className='ml-[420px] mt-7 rounded-full border border-main p-2 hover:bg-main hover:text-white sm:ml-[276px]'
      >
        Сохранить
      </button>
    </div>
  );
};

export default SettingsMenu;
