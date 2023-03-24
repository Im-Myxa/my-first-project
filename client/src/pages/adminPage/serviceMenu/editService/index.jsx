import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import axios from '../../../../services/axios';
import { getAllMaster } from '../../../../store/features/master/masterSlice';
import {
  editService,
  getAllServices
} from '../../../../store/features/service/serviceSlice';

const EditService = ({ onHide, show }) => {
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [master, setMaster] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [oldImage, setOldImage] = useState('');
  const [newImage, setNewImage] = useState('');
  const [defaultValue, setDefaultValue] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllMaster());
  }, []);

  const { masters, loading, status } = useSelector(state => state.master);

  const getService = useCallback(async () => {
    const { data } = await axios.get(`/services/${show._id}`);
    setName(data.name);
    setId(data._id);
    setMaster(data.master);
    setDescription(data.description);
    setPrice(data.price);
    setOldImage(data.image);

    const index = masters.findIndex(mas => {
      return mas._id === data.master;
    });
    setDefaultValue(masters[index].name);
  }, [show._id]);

  useEffect(() => {
    getService();
  }, []);

  const handleChangeImage = event => {
    setNewImage(event.target.files[0]);
    setOldImage('');
  };

  const handleClearForm = () => {
    setName('');
    setMaster('');
    setDescription('');
    setPrice('');
    setOldImage('');
    setNewImage('');
  };

  const handleEditMaster = async () => {
    try {
      const editedMaster = new FormData();
      editedMaster.append('_id', id);
      if (master) editedMaster.append('master', master);
      editedMaster.append('description', description);
      editedMaster.append('name', name);
      editedMaster.append('price', price);
      editedMaster.append('image', newImage ? newImage : oldImage);

      await dispatch(editService(editedMaster));
      dispatch(getAllServices());
      onHide();
    } catch (error) {
      return error;
    }
  };

  if (!id && loading && status === 'pending') {
    return <div className='content-center justify-center'>Загрузка...</div>;
  }

  return (
    <div className='container my-4 w-full border-b border-main/[0.1] pb-4'>
      <div className='flex items-center justify-between text-xl'>
        <h1>Изменить услугу</h1>
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
          {oldImage && (
            <img
              src={`http://localhost:8080/${oldImage}`}
              alt={oldImage}
              className='flex h-[304px] w-full flex-shrink-0 rounded-lg object-cover'
            />
          )}
          {newImage && (
            <img
              src={URL.createObjectURL(newImage)}
              alt={newImage}
              className='flex h-[304px] w-full flex-shrink-0 rounded-lg object-cover'
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
            <p className='pt-2 pb-1'>Наименование услуги</p>
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
                defaultValue={defaultValue || 'Выбери мастера'}
              >
                <option selected>{defaultValue || 'Выбери мастера'}</option>
                {masters.map(mas => {
                  if (mas.name !== defaultValue) {
                    return (
                      <option key={mas._id} value={mas._id}>
                        {mas.name}
                      </option>
                    );
                  }
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
          onClick={handleEditMaster}
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

EditService.propTypes = {
  onHide: PropTypes.func,
  show: PropTypes.oneOfType([PropTypes.bool, PropTypes.object])
};

export default EditService;
