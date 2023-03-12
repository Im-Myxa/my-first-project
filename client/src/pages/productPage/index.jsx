import React, { useCallback, useEffect, useState } from 'react';
import { useParams, useNavigate, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from '../../services/axios';
import { removeProduct } from '../../store/features/product/productSlice';

const ProductPage = () => {
  const [product, setProduct] = useState(null);
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, status } = useSelector(state => state.product);

  const getProduct = useCallback(async () => {
    const { data } = await axios.get(`/products/${params.productId}`);
    setProduct(data);
  }, [params.productId]);

  useEffect(() => {
    getProduct();
  }, [getProduct]);

  const handleRemoveProduct = async () => {
    try {
      await dispatch(removeProduct(product._id));
      navigate('/products');
    } catch (error) {
      return error;
    }
  };

  if (!product) {
    return (
      <div className='text-xl text-center text-white py-10'>Загрузка...</div>
    );
  }

  return (
    <>
      {loading && status === 'pending' ? (
        <div className='content-center justify-center'>Загрузка...</div>
      ) : (
        <div className='bg-white'>
          <div className='pt-6'>
            <div className='mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8'>
              <div className='aspect-w-3 aspect-h-4 hidden overflow-hidden rounded-lg lg:block'>
                <img
                  src={`http://localhost:8080/${product.image}`}
                  alt='Картинка товара'
                  className='h-full w-full object-cover object-center'
                />
              </div>
            </div>

            <form className='mt-10'>
              <div className='lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8'>
                <div>
                  <h1 className='text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl'>
                    {product.title}
                  </h1>
                  <p className='text-3xl tracking-tight text-gray-900'>
                    {product.price}
                  </p>
                </div>
                <div className='space-y-6'>
                  <p className='text-base text-gray-900'>
                    {product.description}
                  </p>
                </div>
              </div>
              <button
                type='submit'
                className='mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
              >
                Добавить в корзину
              </button>
              <button
                onClick={handleRemoveProduct}
                type='submit'
                className='mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
              >
                Удалить товар
              </button>
              <NavLink to={`/products/${product._id}/edit`}>
                <button
                  type='submit'
                  className='mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                >
                  Изменить товар
                </button>
              </NavLink>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductPage;
