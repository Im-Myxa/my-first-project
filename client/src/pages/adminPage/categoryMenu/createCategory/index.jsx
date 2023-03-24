import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import {
  createCategory,
  getAllCategories
} from '../../../../store/features/category/categorySlice';

const CreateCategory = ({ onHide }) => {
  const [name, setName] = useState('');
  const [image, setImage] = useState('');

  const dispatch = useDispatch();

  const handleChangeImage = event => {
    setImage(event.target.files[0]);
  };

  const handleClearForm = () => {
    setName('');
    setImage('');
  };

  const handleCreateCategory = () => {
    try {
      const newProduct = new FormData();
      newProduct.append('name', name);
      newProduct.append('image', image);

      dispatch(createCategory(newProduct));
      dispatch(getAllCategories());
      handleClearForm();
    } catch (error) {
      return error;
    }
  };

  return (
    <div className='container my-4 border-b border-main/[0.1] py-4 text-xl'>
      <div className='flex justify-between'>
        <h1>Создать категорию</h1>
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
      <form className='my-2 text-lg' onSubmit={e => e.preventDefault()}>
        <div className='mb-2'>
          {image && (
            <img
              src={URL.createObjectURL(image)}
              className=' max-h-[100px] max-w-[100px] rounded-lg object-cover'
              alt={image.name}
            />
          )}

          <label className='flex max-w-[100px] cursor-pointer items-center justify-center rounded-lg border border-main hover:bg-main hover:text-white'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='h-9 w-9 '
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M12 9.75v6.75m0 0l-3-3m3 3l3-3m-8.25 6a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z'
              />
            </svg>
            <input
              type='file'
              className='hidden'
              onChange={handleChangeImage}
            />
          </label>
        </div>

        <label className=''>
          <p className=' mb-2'>Наименование категории</p>
          <input
            type='text'
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder='Название категории'
            className='max-w-30 mb-2 rounded-lg border bg-main/[0.1] px-2 outline-none placeholder:text-gray-700'
          />
        </label>
      </form>
      <div className='my-2 flex items-center gap-8 text-lg'>
        <button
          onClick={handleCreateCategory}
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

CreateCategory.propTypes = {
  onHide: PropTypes.func
};

export default CreateCategory;
