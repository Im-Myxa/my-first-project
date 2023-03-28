import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { tokenIsValid } from '../../store/features/auth/authSlice';
import {
  addProductInBasket,
  decrementProduct,
  getBasket,
  removeBasket,
  removeProductInBasket
} from '../../store/features/basket/basketSlice';
import { createOrder } from '../../store/features/order/orderSlice';
import { formatQuantity } from '../../utils/formatQuantity';

const BasketPage = () => {
  const [products, setProducts] = useState('');
  const [sumProducts, setSumProducts] = useState('');
  const [lengthList, setLengthList] = useState(0);

  const { user } = useSelector(state => state.auth);

  const { userId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getProductInBasket = useCallback(async () => {
    const { payload } = await dispatch(getBasket(userId));
    setProducts(payload.products);

    const products = payload.products;
    if (products) {
      setLengthList(products.length);
      const arr = products.map(prod => {
        return prod.price * prod.quantity;
      });
      const sum = arr.reduce((acc, curr) => acc + curr, 0);
      setSumProducts(sum);
    } else {
      setLengthList(0);
      setSumProducts(0);
    }
  }, [userId]);

  useEffect(() => {
    dispatch(tokenIsValid());

    getProductInBasket();
  }, []);

  if (!user) return <div>Загрузка...</div>;
  if (user._id !== userId) {
    return navigate('/products');
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

  const handleCreateOrder = async () => {
    if (lengthList === 0) {
      return null;
    } else {
      const listProducts = products.map(prod => {
        return {
          name: prod.name,
          quantity: prod.quantity,
          cost: prod.quantity * prod.price
        };
      });

      try {
        const createdOrder = {
          userId,
          products: listProducts,
          sumOrder: sumProducts
        };

        await dispatch(createOrder(createdOrder));
        await dispatch(removeBasket());
        getProductInBasket();
      } catch (error) {
        return error;
      }
    }
  };

  return (
    <div className='mx-auto my-16 font-roboto text-main lg:w-[1000px] md:w-[750px] sm:w-[470px] xs:w-[400px]'>
      <div className='flex space-x-2'>
        <p className='text-2xl'>
          Ваша корзина, {lengthList} {formatQuantity(lengthList)}
        </p>
        <p className='text-2xl text-main/[0.5] '></p>
      </div>
      <div className=' mt-4 flex gap-4 md:grid'>
        <div className='w-3/4 gap-4 space-y-4 border border-main/[0.1] p-2 md:w-full sm:w-full xs:w-full'>
          {products &&
            products.map(product => {
              return (
                <div
                  className='h-36 border border-main/[0.1] p-2'
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
                    <div className='h-32 w-full pl-1'>
                      <div className='flex items-center justify-between'>
                        <p className='w-full py-2 text-xl font-bold sm:text-base'>
                          {product.name}
                        </p>
                        <button
                          onClick={() => handleRemoveProduct(product.productId)}
                          className='mt-[-20px] flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full hover:bg-main/[0.1]'
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
                      <div className='mt-10 flex items-center justify-between sm:mt-6'>
                        <p className='sm:text-base'>{product.price} ₽</p>
                        <div className='flex items-center gap-4 sm:text-base'>
                          <button
                            onClick={() => handleDecrement(product.productId)}
                            className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full hover:bg-main/[0.1]`}
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
                          <div className='text-xl sm:text-base'>
                            {product.quantity}
                          </div>
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
                        <p className='text-xl sm:text-base'>
                          {product.price * product.quantity} ₽
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
        <div className='h-64 w-1/4 space-y-4 rounded-lg border border-main/[0.1] p-2 md:w-[300px]'>
          <p className='border-b border-main/[0.1] p-2 text-xl'>Ваш заказ</p>
          <div className='flex items-center justify-between p-2'>
            <p className='text-lg text-main/[0.8]'>Товары ({lengthList}):</p>
            <p className='text-lg text-main/[0.8]'>{sumProducts} ₽</p>
          </div>
          <div className='flex items-center justify-between p-2'>
            <p className='text-lg text-main/[0.8]'>Итого:</p>
            <p className='text-2xl font-bold text-main'>{sumProducts} ₽</p>
          </div>
          <button
            onClick={handleCreateOrder}
            className='mx-auto w-full rounded-lg border border-main py-2 text-xl text-main hover:bg-main hover:text-white'
          >
            Оформить заказ
          </button>
        </div>
      </div>
    </div>
  );
};

export default BasketPage;
