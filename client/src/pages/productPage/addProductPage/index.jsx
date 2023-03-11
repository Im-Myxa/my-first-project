import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { checkIsAuth } from '../../../store/features/auth/authSlice';
import { createProduct } from '../../../store/features/product/productSlice';

const AddProduct = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const { status } = useSelector(state => state.product);
  const isAuth = useSelector(checkIsAuth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (!isAuth) {
    navigate('/products');
  }

  useEffect(() => {
    if (status) {
      toast.info(status);
    }
  }, [status]);

  const handleChange = event => {
    setImage(event.target.files[0]);
  };

  const handleClearForm = () => {
    setTitle('');
    setDescription('');
    setPrice('');
    setImage('');
  };

  const handleCreateProduct = () => {
    try {
      const newProduct = new FormData();
      newProduct.append('title', title);
      newProduct.append('description', description);
      newProduct.append('price', price);
      newProduct.append('image', image);

      dispatch(createProduct(newProduct));
      handleClearForm();
    } catch (error) {
      return error;
    }
  };

  return (
    <form className='w-1/3 mx-auto py-10' onSubmit={e => e.preventDefault()}>
      <label className='flex items-center justify-center border-2 border-dotted cursor-pointer py-2 mt-2 text-xs bg-gradient-to-r from-blue-300 to-blue-600'>
        Прикрепить изорбажение:
        <input
          name='image'
          type='file'
          className='hidden'
          onChange={handleChange}
        />
      </label>
      <div className='flex object-cover py-2'>
        {image && <img src={URL.createObjectURL(image)} alt={image.name} />}
      </div>

      <label className='text-xs'>
        Название продукта:
        <input
          name='title'
          type='text'
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder='Название продукта'
          className='mt-1 w-full rounded-lg bg-sky-100 border py-1 px-2 text-xs outline-none placeholder:text-gray-700'
        />
      </label>
      <label className='text-xs'>
        Стоимость продукта:
        <br />
        <input
          name='price'
          type='text'
          value={price}
          onChange={e => setPrice(e.target.value)}
          placeholder='Цена'
          className='mt-1 w-1/3 rounded-lg bg-sky-100 border py-1 px-2 text-xs outline-none placeholder:text-gray-700'
        />
      </label>
      <br />
      <label className='text-xs'>
        Описание продукта:
        <textarea
          name='description'
          value={description}
          type='text'
          onChange={e => setDescription(e.target.value)}
          placeholder='Описание'
          className='mt-1 w-full rounded-lg bg-sky-100 border py-1 px-2 text-xs outline-none resize-none h-40 placeholder:text-gray-700'
        />
      </label>

      <div className='flex gap-8 items-center justify-center mt-4'>
        <button
          onClick={handleCreateProduct}
          className='flex justify-center items-center bg-blue-300 text-xs rounded-sm py-2 px-4'
        >
          Добавить
        </button>

        <button
          onClick={handleClearForm}
          className='flex justify-center items-center bg-blue-600 text-xs rounded-sm py-2 px-4'
        >
          Отменить
        </button>
      </div>
    </form>
  );
};

export default AddProduct;
