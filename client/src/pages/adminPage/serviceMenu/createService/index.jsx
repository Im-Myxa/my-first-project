import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { getAllMaster } from '../../../../store/features/master/masterSlice';
import {
  createService,
  getAllServices
} from '../../../../store/features/service/serviceSlice';

const CreateService = ({ onHide }) => {
  const [name, setName] = useState('');
  const [master, setMaster] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');

  useEffect(() => {
    dispatch(getAllMaster());
  }, []);

  const { masters, loading, status } = useSelector(state => state.master);

  const dispatch = useDispatch();

  const handleChangeImage = event => {
    setImage(event.target.files[0]);
  };

  const handleClearForm = () => {
    setName('');
    setMaster('');
    setDescription('');
    setPrice('');
    setImage('');
  };

  const handleCreateService = async () => {
    try {
      const newService = new FormData();
      newService.append('name', name);
      if (master) newService.append('master', master);
      newService.append('description', description);
      newService.append('price', price);
      newService.append('image', image);

      await dispatch(createService(newService));
      dispatch(getAllServices());
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
            <h1>Создать услугу</h1>
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

              <label className='absolute bottom-[18px] flex w-1/4 cursor-pointer items-center justify-center rounded-lg border border-main py-2 hover:bg-main hover:text-white'>
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
                <p className='mb-2'>Наименование услуги</p>
                <input
                  type='text'
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder='Название услуги'
                  className='mb-2 w-full rounded-lg border bg-main/[0.1] outline-none placeholder:text-gray-700'
                />
              </label>

              <div className='flex space-x-2'>
                <label className='w-1/2'>
                  <p className='my-2'>Мастер</p>

                  <select
                    className='mb-2 w-full border border-main/[0.5] px-1'
                    onChange={e => setMaster(e.target.value)}
                    defaultValue='Выбери мастера'
                    data-te-select-clear-button='true'
                  >
                    <option disabled>Выбери мастера</option>
                    {masters.map(mas => {
                      return (
                        <option key={mas._id} value={mas._id}>
                          {mas.name}
                        </option>
                      );
                    })}
                  </select>
                </label>
                <label className='w-1/2'>
                  <p className='my-2'>Стоимость услуги</p>
                  <input
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                    placeholder='Цена'
                    className='mb-2 w-full rounded-lg border bg-main/[0.1] outline-none placeholder:text-gray-700'
                  />
                </label>
              </div>

              <label className=''>
                <p className='my-2'>Описание услуги</p>
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
              onClick={handleCreateService}
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

CreateService.propTypes = {
  onHide: PropTypes.func
};

export default CreateService;
