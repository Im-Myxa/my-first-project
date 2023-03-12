import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import ProductCard from '../../components/productCard';
import { getAllProduct } from '../../store/features/product/productSlice';

const ProductsListPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProduct());
  }, []);

  const { products, loading, status } = useSelector(state => state.product);

  if (!products) {
    return (
      <div className='bg-white text-xl text-center text-gray-700 py-10'>
        Список пуст!
      </div>
    );
  }

  return (
    <>
      {loading && status === 'pending' ? (
        <div className='content-center justify-center'>Загрузка...</div>
      ) : (
        <div className='bg-white'>
          <div className='mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8'>
            <h1 className=' text-gray-700 pb-10'>Продукты</h1>
            <NavLink to={'/products/addProduct'}>
              <button
                type='submit'
                className='mb-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
              >
                Добавить товар
              </button>
            </NavLink>

            <div className='grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8'>
              {products.map((product, index) => {
                return <ProductCard key={index} product={product} />;
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductsListPage;
