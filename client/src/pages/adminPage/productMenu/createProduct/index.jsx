import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import {
  createProduct,
  getAllProduct
} from '../../../../store/features/product/productSlice';
import { getAllCategories } from '../../../../store/features/category/categorySlice';

const CreateProduct = ({ onHide }) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');

  useEffect(() => {
    dispatch(getAllCategories());
  }, []);

  const { categories, loading, status } = useSelector(state => state.category);

  const dispatch = useDispatch();

  const handleChange = event => {
    setImage(event.target.files[0]);
  };

  const handleClearForm = () => {
    setName('');
    setCategory('');
    setDescription('');
    setPrice('');
    setImage('');
  };

  const handleCreateProduct = async () => {
    try {
      const newProduct = new FormData();
      newProduct.append('name', name);
      if (category) newProduct.append('category', category);
      newProduct.append('description', description);
      newProduct.append('price', price);
      newProduct.append('image', image);

      await dispatch(createProduct(newProduct));
      dispatch(getAllProduct());
      handleClearForm();
    } catch (error) {
      return error;
    }
  };

  return (
    <>
      {loading && status === 'pending' ? (
        <div className='content-center justify-center'>Загрузка...</div>
      ) : (
        <div className='container my-4 w-full border-b border-main/[0.1] pb-4'>
          <div className='flex items-center justify-between text-xl'>
            <h1>Создать товар</h1>
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
                <input type='file' className='hidden' onChange={handleChange} />
              </label>
            </div>

            <div className='mx-auto w-2/3'>
              <label className=''>
                <p className='mb-2'>Наименование товара</p>
                <input
                  type='text'
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder='Название товара'
                  className='mb-2 w-full rounded-lg border bg-main/[0.1] outline-none placeholder:text-gray-700'
                />
              </label>

              <div className='flex space-x-2'>
                <label className='w-1/2'>
                  <p className='my-2'>Категория</p>

                  <select
                    className='mb-2 w-full border border-main/[0.5] px-1'
                    onChange={e => setCategory(e.target.value)}
                    defaultValue='Выбери категорию'
                    data-te-select-clear-button='true'
                  >
                    <option disabled>Выбери категорию</option>
                    {categories.map(cat => {
                      return (
                        <option key={cat._id} value={cat._id}>
                          {cat.name}
                        </option>
                      );
                    })}
                  </select>
                </label>
                <label className='w-1/2'>
                  <p className='my-2'>Стоимость товара:</p>
                  <input
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                    placeholder='Цена'
                    className='mb-2 w-full rounded-lg border bg-main/[0.1] outline-none placeholder:text-gray-700'
                  />
                </label>
              </div>

              <label className=''>
                <p className='my-2'>Описание товара:</p>
                <textarea
                  value={description}
                  type='text'
                  onChange={e => setDescription(e.target.value)}
                  placeholder='Описание'
                  className='mb-2 h-40 w-full resize-none rounded-lg border bg-main/[0.1] outline-none placeholder:text-gray-700'
                />
              </label>
            </div>
          </form>
          <div className='my-2 flex items-center justify-center gap-8 text-lg'>
            <button
              onClick={handleCreateProduct}
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
      )}
    </>
  );
};

CreateProduct.propTypes = {
  onHide: PropTypes.func
};

export default CreateProduct;
