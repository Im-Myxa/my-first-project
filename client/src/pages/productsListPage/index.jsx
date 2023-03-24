import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ProductCard from '../../components/productCard';
import { getAllProduct } from '../../store/features/product/productSlice';
import { getAllCategories } from '../../store/features/category/categorySlice';

const ProductsListPage = () => {
  const [filter, setFilter] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProduct());
    dispatch(getAllCategories());
  }, []);

  const { products, loading, status } = useSelector(state => state.product);
  const { categories } = useSelector(state => state.category);
  const filteredProduct = filter
    ? products.filter(product => product.category === filter._id)
    : products;

  if (!products) {
    return (
      <div className='items-center justify-center bg-white py-10 text-2xl text-main'>
        Список пуст!
      </div>
    );
  }

  return (
    <>
      {loading && status === 'pending' ? (
        <div className='items-center justify-center bg-white py-10 text-2xl text-main'>
          Загрузка...
        </div>
      ) : (
        <div className='mx-auto mt-16 font-mill text-lg'>
          <div className='mb-6 flex w-full items-center justify-between border-b border-main/[0.2] pb-2'>
            <h2 className='text-3xl font-bold'>Товары</h2>
            <div className='flex items-center justify-center gap-2'>
              <span className='text-main/[0.5]'>Сортировка</span>
              <button className='flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full hover:bg-main/[0.1]'>
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
                    d='M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10'
                  />
                </svg>
              </button>
            </div>
          </div>
          <div className=' flex space-x-10'>
            <div className='w-1/5 space-y-6'>
              <h2 className='w-full text-xl font-bold'>Категории</h2>
              <ul className='my-2 border-b border-main/[0.2] pb-2 '>
                {categories.map(category => {
                  return (
                    <li key={category._id} className='mb-2'>
                      <button
                        className='flex w-full items-center gap-2 rounded-lg p-2 hover:bg-main/[0.1]'
                        onClick={() => setFilter({ _id: category._id })}
                      >
                        {category.image ? (
                          <img
                            src={`http://localhost:8080/${category.image}`}
                            className='flex h-[30px] w-[30px] flex-shrink-0 rounded-lg object-cover'
                          />
                        ) : (
                          <img
                            src={`https://нт.элитсад.рф/assets/components/project/app/img/empty.png`}
                            className='flex h-[30px] w-[30px] flex-shrink-0 rounded-lg object-cover'
                          />
                        )}
                        <span className='w-full'>{category.name}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
              <h2 className='w-full text-xl font-bold'>Цена</h2>
              <div className='my-2 border-b border-main/[0.2] pb-2'></div>
              <button
                className='text-md border-b text-main/[0.5] hover:border-main hover:text-main'
                onClick={() => setFilter(null)}
              >
                Очистить фильтр
              </button>
            </div>
            <div className='grid w-4/5 grid-cols-4 gap-8 bg-main/[0.05]'>
              {filteredProduct.map(product => {
                return <ProductCard key={product._id} product={product} />;
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductsListPage;
