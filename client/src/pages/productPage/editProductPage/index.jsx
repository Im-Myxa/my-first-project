import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
// import { checkIsAuth } from '../../../store/features/auth/authSlice';
import { editProduct } from '../../../store/features/product/productSlice';
import axios from '../../../services/axios';

const EditProductPage = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [oldImage, setOldImage] = useState('');
  const [newImage, setNewImage] = useState('');
  const { loading, status } = useSelector(state => state.product);

  // const isAuth = useSelector(checkIsAuth);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const { productId } = params;

  // if (!isAuth) {
  //   navigate('/products');
  // }

  const getProduct = useCallback(async () => {
    const { data } = await axios.get(`/products/${productId}`);
    setTitle(data.title);
    setDescription(data.description);
    setPrice(data.price);
    setOldImage(data.image);
  }, [productId]);

  useEffect(() => {
    getProduct();
  }, []);

  const handleChangeImage = event => {
    setNewImage(event.target.files[0]);
    setOldImage('');
  };

  const handleClearForm = () => {
    setTitle('');
    setDescription('');
    setPrice('');
    setOldImage('');
    setNewImage('');
  };

  const handleEditProduct = async () => {
    try {
      const editedProduct = new FormData();
      editedProduct.append('_id', productId);
      editedProduct.append('description', description);
      editedProduct.append('title', title);
      editedProduct.append('price', price);
      editedProduct.append('image', newImage ? newImage : oldImage);

      await dispatch(editProduct(editedProduct));
      navigate(`/products/${productId}`);
    } catch (error) {
      return error;
    }
  };

  return (
    <>
      {loading && status === 'pending' ? (
        <div className='content-center justify-center'>Загрузка...</div>
      ) : (
        <form
          className='w-1/3 mx-auto py-10'
          onSubmit={e => e.preventDefault()}
        >
          <label className='flex items-center justify-center border-2 border-dotted cursor-pointer py-2 mt-2 text-xs bg-gradient-to-r from-blue-300 to-blue-600'>
            Прикрепить изорбажение:
            <input
              name='image'
              type='file'
              className='hidden'
              onChange={handleChangeImage}
            />
          </label>
          <div className='flex object-cover py-2'>
            {oldImage && (
              <img
                src={`http://localhost:8080/${oldImage}`}
                alt={oldImage.name}
              />
            )}
            {newImage && (
              <img src={URL.createObjectURL(newImage)} alt={newImage.name} />
            )}
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
              onClick={handleEditProduct}
              className='flex justify-center items-center bg-blue-300 text-xs rounded-sm py-2 px-4'
            >
              Изменить
            </button>

            <button
              onClick={handleClearForm}
              className='flex justify-center items-center bg-blue-600 text-xs rounded-sm py-2 px-4'
            >
              Очистить форму
            </button>
          </div>
        </form>
      )}
    </>
  );
};

export default EditProductPage;
