import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import {
  createMaster,
  getAllMaster
} from '../../../../store/features/master/masterSlice';

const CreateMaster = ({ onHide }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [image, setImage] = useState('');

  const dispatch = useDispatch();

  const handleChangeImage = event => {
    setImage(event.target.files[0]);
  };

  const handleClearForm = () => {
    setName('');
    setDescription('');
    setSpecialization('');
    setImage('');
  };

  const handleCreateMaster = async () => {
    try {
      const newMaster = new FormData();
      newMaster.append('name', name);
      newMaster.append('description', description);
      newMaster.append('specialization', specialization);
      newMaster.append('image', image);

      await dispatch(createMaster(newMaster));
      dispatch(getAllMaster());
      handleClearForm();
    } catch (error) {
      return error;
    }
  };

  return (
    <div className='container my-4 w-full border-b border-main/[0.1] pb-4'>
      <div className='flex items-center justify-between text-xl'>
        <h1>Создать мастера</h1>
        <button
          className='flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full hover:bg-main/[0.1]'
          onClick={onHide}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='h-6 w-6'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M6 18L18 6M6 6l12 12'
            />
          </svg>
        </button>
      </div>
      <form
        className='relative my-2 flex w-full space-x-4 text-lg'
        onSubmit={e => e.preventDefault()}
      >
        <div className='w-1/4 items-center justify-center space-y-2'>
          {image && (
            <img
              src={URL.createObjectURL(image)}
              className='flex h-[304px] w-full flex-shrink-0  rounded-lg object-cover'
              alt={image.name}
            />
          )}

          <label className='absolute bottom-[15px] flex w-1/4 cursor-pointer items-center justify-center rounded-lg border border-main py-2 hover:bg-main hover:text-white'>
            Прикрепить изорбажение
            <input
              type='file'
              className='hidden'
              onChange={handleChangeImage}
            />
          </label>
        </div>

        <div className='mx-auto w-2/3'>
          <label className=''>
            <p className='mb-2'>Имя мастра</p>
            <input
              type='text'
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder='Имя, Фамилия'
              className='mb-2 w-full rounded-lg border bg-main/[0.1] p-2 outline-none placeholder:text-gray-700'
            />
          </label>

          <label className=''>
            <p className='mb-2'>Специализация</p>
            <input
              type='text'
              value={specialization}
              onChange={e => setSpecialization(e.target.value)}
              placeholder='Специализация'
              className='mb-2 w-full rounded-lg border bg-main/[0.1] p-2 outline-none placeholder:text-gray-700'
            />
          </label>

          <label className=''>
            <p className='my-2'>О мастере:</p>
            <textarea
              value={description}
              type='text'
              onChange={e => setDescription(e.target.value)}
              placeholder='Описание'
              className='mb-2 h-60 w-full resize-none rounded-lg border bg-main/[0.1] p-2 outline-none placeholder:text-gray-700'
            />
          </label>
        </div>
      </form>
      <div className='my-2 flex items-center justify-center gap-8 text-lg'>
        <button
          onClick={handleCreateMaster}
          className='h-10 w-24 rounded-lg border border-main hover:bg-main hover:text-white'
        >
          Создать
        </button>

        <button
          onClick={handleClearForm}
          className='h-10 w-24 rounded-lg border border-main hover:bg-main hover:text-white'
        >
          Очистить
        </button>
      </div>
    </div>
  );
};

CreateMaster.propTypes = {
  onHide: PropTypes.func
};

export default CreateMaster;
