import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
  addProductInBasket,
  decrementProduct,
  getBasket,
  removeProductInBasket
} from '../../store/features/basket/basketSlice';
import { getUser } from '../../store/features/user/userSlice';

const BasketPage = () => {
  const [products, setProducts] = useState('');
  const [user, setUser] = useState('');
  const [sumProducts, setSumProducts] = useState('');

  const { userId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getUserMe = useCallback(async () => {
    const { payload } = await dispatch(getUser(userId));
    setUser(payload);
  }, [userId]);

  const getProductInBasket = useCallback(async () => {
    const { payload } = await dispatch(getBasket(userId));
    setProducts(payload.products);

    const arr = payload.products.map(prod => {
      return prod.price * prod.quantity;
    });
    const sum = arr.reduce((acc, curr) => acc + curr, 0);
    setSumProducts(sum);
  }, [userId]);

  useEffect(() => {
    getUserMe();
    getProductInBasket();
  }, []);

  if (!user) return <div>Загрузка...</div>;
  if (user._id !== userId) {
    return navigate('/');
  }

  const handleRemoveProduct = async productId => {
    try {
      await dispatch(removeProductInBasket(productId));
      getProductInBasket();
    } catch (error) {
      return error;
    }
  };

  const handleIncrement = async productId => {
    try {
      const addProduct = {
        userId,
        productId
      };
      await dispatch(addProductInBasket(addProduct));
      getProductInBasket();
    } catch (error) {
      return error;
    }
  };
  const handleDecrement = async productId => {
    try {
      const decrementedProduct = {
        userId,
        productId
      };
      await dispatch(decrementProduct(decrementedProduct));
      getProductInBasket();
    } catch (error) {
      return error;
    }
  };

  return (
    <div className='container mx-auto my-16 font-mill text-main'>
      <div className='flex space-x-2'>
        <p className='text-2xl'>Ваша корзина,</p>
        <p className='text-2xl text-main/[0.5] '>
          {products ? products.length : ''} товаров
        </p>
      </div>
      <div className=' mt-4 flex space-x-3'>
        <div className='w-3/4 space-y-4 border border-main/[0.1] p-2'>
          {products &&
            products.map(product => {
              return (
                <div
                  className='relative h-36 border border-main/[0.1] p-2 '
                  key={product._id}
                >
                  <div className='flex '>
                    <div className='mx-auto'>
                      <button>
                        {product.image && (
                          <img
                            src={`http://localhost:8080/${product.image}`}
                            className='h-32 w-32'
                          />
                        )}
                        {!product.image && (
                          <img
                            src={
                              'https://нт.элитсад.рф/assets/components/project/app/img/empty.png'
                            }
                            className='h-32 w-32'
                          />
                        )}
                      </button>
                    </div>
                    <div className='h-32 w-full'>
                      <div className='items-center'>
                        <p className='w-full py-2 text-xl font-bold'>
                          {product.name}
                        </p>
                        <button
                          onClick={() => handleRemoveProduct(product.productId)}
                          className='absolute right-0 top-0 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full hover:bg-main/[0.1]'
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
                              d='M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0'
                            />
                          </svg>
                        </button>
                      </div>
                      <div className='flex items-center justify-between'>
                        <p className=''>{product.price}</p>
                        <div className='flex items-center space-x-4'>
                          <button
                            onClick={() => handleDecrement(product.productId)}
                            className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full hover:bg-main/[0.1] `}
                            disabled={product.quantity === 1 && true}
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
                                d='M18 12H6'
                              />
                            </svg>
                          </button>
                          <div className='text-xl'>{product.quantity}</div>
                          <button
                            onClick={() => handleIncrement(product.productId)}
                            className='flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full hover:bg-main/[0.1]'
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
                                d='M12 6v12m6-6H6'
                              />
                            </svg>
                          </button>
                        </div>
                        <p className='text-xl'>
                          {product.price * product.quantity}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
        <div className='h-64 w-1/4 space-y-4 rounded-lg border border-main/[0.1] p-2'>
          <p className='border-b border-main/[0.1] p-2 text-xl'>Ваш заказ</p>
          <div className='flex items-center justify-between p-2'>
            <p className='text-lg text-main/[0.8]'>
              Товары ({products.length}):
            </p>
            <p className='text-lg text-main/[0.8]'>{sumProducts} рублей</p>
          </div>
          <div className='flex items-center justify-between p-2'>
            <p className='text-lg text-main/[0.8]'>Итого:</p>
            <p className='text-2xl font-bold text-main'>{sumProducts} рублей</p>
          </div>
          <button className='mx-auto w-full rounded-lg border border-main py-2 text-xl text-main hover:bg-main hover:text-white'>
            Оформить заказ
          </button>
        </div>
      </div>
    </div>
  );
};

export default BasketPage;
