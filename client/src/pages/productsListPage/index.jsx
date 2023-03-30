import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import ProductCard from '../../components/productCard';
import { getAllProduct } from '../../store/features/product/productSlice';
import { getAllCategories } from '../../store/features/category/categorySlice';
import Sorting from '../../components/sorting';
import Search from '../../components/search';

const ProductsListPage = () => {
  const [filter, setFilter] = useState('');
  const [sortType, setSortType] = useState('');
  const [search, setSearch] = useState('');
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const dispatch = useDispatch();

  const getProducts = async () => {
    try {
      const { payload } = await dispatch(getAllProduct());
      setProducts(payload);
    } catch (error) {
      return error;
    }
  };

  const getCategories = async () => {
    try {
      const { payload } = await dispatch(getAllCategories());
      setCategories(payload);
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    getProducts();
    getCategories();
  }, []);

  const handleSortType = type => {
    setSortType(type);
  };

  const filteredProducts = filter
    ? products.filter(product => product.category === filter._id)
    : products;

  const searchProduct = filteredProducts.filter(product => {
    return product.name.toLowerCase().includes(search.toLowerCase());
  });

  const getSortingProducts = useCallback(() => {
    if (sortType === 'Возрастанию цены') {
      searchProduct.sort((a, b) => {
        if (a.price < b.price) {
          return -1;
        }
      });
    }
    if (sortType === 'Убыванию цены') {
      searchProduct.sort((a, b) => {
        if (a.price > b.price) {
          return -1;
        }
      });
    }

    if (sortType === 'Новинкам') {
      searchProduct.sort((a, b) => {
        if (a.createdAt > b.createdAt) {
          return -1;
        }
      });
    }

    return searchProduct;
  }, [sortType, searchProduct]);

  const sortingProducts = getSortingProducts();

  return (
    <>
      {products && categories === 'pending' ? (
        <div className='items-center justify-center bg-white py-10 text-2xl text-main'>
          Загрузка...
        </div>
      ) : (
        <div className='text-roboto my-16 mx-auto w-[1300px] px-8 text-lg sg:w-[1020px] md:w-[760px] sm:w-[480px] xs:w-[399px] xs:px-0'>
          <div className='mb-6 flex w-full items-center justify-between border-b border-main/[0.2] pb-2 md:grid md:w-full md:justify-start md:space-y-4 xs:w-full'>
            <h2 className='text-3xl font-bold md:hidden'>Товары</h2>
            <Search search={search} onHandleSearch={setSearch} />
            <Sorting onSortType={handleSortType} />
          </div>
          <div className=' flex md:grid md:gap-4'>
            <div className='w-1/5 space-y-6 md:mx-auto md:w-full '>
              <div className='flex items-center justify-between'>
                <h2 className='text-xl font-bold'>Категории</h2>
                <button
                  className='hidden border-b text-base text-main/[0.5] hover:border-main hover:text-main md:block'
                  onClick={() => setFilter(null)}
                >
                  Очистить фильтр
                </button>
              </div>

              <ul className='my-2 border-b border-main/[0.2] pb-2 '>
                {categories &&
                  categories.map(category => {
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
              <button
                className='text-md border-b text-main/[0.5] hover:border-main hover:text-main md:hidden'
                onClick={() => setFilter(null)}
              >
                Очистить фильтр
              </button>
            </div>
            <div className='grid w-3/4 grid-cols-4 gap-8 sg:grid-cols-3 md:grid-cols-2 mx-auto sm:grid-cols-1'>
              {sortingProducts ? (
                sortingProducts.map(product => {
                  return <ProductCard key={product._id} product={product} />;
                })
              ) : (
                <div className='items-center justify-center bg-white py-10 text-2xl text-main'>
                  Список пуст!
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductsListPage;
