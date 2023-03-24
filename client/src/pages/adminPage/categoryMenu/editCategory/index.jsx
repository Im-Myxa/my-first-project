import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import axios from '../../../../services/axios';
import {
  editCategory,
  getAllCategories
} from '../../../../store/features/category/categorySlice';

const EditCategory = ({ onHide, show }) => {
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [oldImage, setOldImage] = useState('');
  const [newImage, setNewImage] = useState('');

  const dispatch = useDispatch();

  const getCategory = useCallback(async () => {
    const { data } = await axios.get(`/categories/${show._id}`);
    setName(data.name);
    setId(data._id);
    setOldImage(data.image);
  }, [show._id]);

  useEffect(() => {
    getCategory();
  }, []);

  const handleChangeImage = event => {
    setNewImage(event.target.files[0]);
    setOldImage('');
  };

  const handleClearForm = () => {
    setName('');
    setNewImage('');
    setOldImage('');
  };

  const handleEditCategory = async () => {
    try {
      const editedCategory = new FormData();
      editedCategory.append('_id', id);
      editedCategory.append('name', name);
      editedCategory.append('image', newImage ? newImage : oldImage);

      await dispatch(editCategory(editedCategory));
      dispatch(getAllCategories());
      onHide();
    } catch (error) {
      return error;
    }
  };

  if (!id) {
    return <div className='content-center justify-center'>Загрузка...</div>;
  }

  return (
    <div className='container my-4 border-b border-main/[0.1] py-4 text-xl'>
      <div className='flex justify-between'>
        <h1>Создать категорию</h1>
        <button
          className='w-9flex-shrink-0 flex h-9 items-center justify-center rounded-full hover:bg-main/[0.1]'
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
          {oldImage && (
            <img
              src={`http://localhost:8080/${oldImage}`}
              alt={oldImage.name}
              className='mb-2 max-h-[100px] max-w-[100px] rounded-lg  object-cover'
            />
          )}
          {newImage && (
            <img
              src={URL.createObjectURL(newImage)}
              alt={newImage.name}
              className='mb-2 max-h-[100px] max-w-[100px] rounded-lg'
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
          <p className='mb-2'>Наименование категории</p>
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
          onClick={handleEditCategory}
          className='h-10 w-24 rounded-lg border border-main hover:bg-main hover:text-white'
        >
          Изменить
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

EditCategory.propTypes = {
  onHide: PropTypes.func,
  show: PropTypes.oneOfType([PropTypes.bool, PropTypes.object])
};

export default EditCategory;
