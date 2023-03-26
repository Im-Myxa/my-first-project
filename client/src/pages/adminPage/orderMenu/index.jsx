import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getAllOrders } from '../../../store/features/order/orderSlice';
import { formatDate } from '../../../utils/formatDate';

const GetAllOrders = () => {
  const [listOrders, setListOrders] = useState('');
  const [show, setShow] = useState('');

  const dispatch = useDispatch();

  const getOrders = async () => {
    try {
      const orders = await dispatch(getAllOrders());
      setListOrders(orders.payload);
    } catch (error) {
      return error;
    }
  };

  const handleShow = id => {
    if (id === show._id) {
      setShow({ ...show, status: !show.status });
    } else {
      setShow({ _id: id, status: true });
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <div className='w-4/5'>
      <div className='flex items-center gap-6 border-b border-main/[0.2] py-2 text-2xl'>
        <h2 className='font-bold'>Заказы</h2>
      </div>
      <div className='space-y-2 py-4 '>
        {!listOrders ? (
          <p className='items-center justify-center py-2 font-bold'>
            Заказов нет!
          </p>
        ) : (
          listOrders.map(order => {
            return (
              <div key={order._id} className='border border-main/[0.2]'>
                <div className='flex items-center justify-between border-b border-main/[0.2] px-2'>
                  <div className='flex '>
                    <div className='w-[150px] py-2 text-main/[0.7]'>
                      <p>ID заказа:</p>
                      <p>Дата заказа:</p>
                    </div>
                    <div className='py-2'>
                      <p>{order._id}</p>
                      <p>{formatDate(order.date)}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleShow(order._id)}
                    className='flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full hover:bg-main/[0.1]'
                  >
                    {show.status && order._id === show._id ? (
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth={1.5}
                        stroke='currentColor'
                        className='h-4 w-4'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M4.5 15.75l7.5-7.5 7.5 7.5'
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth={1.5}
                        stroke='currentColor'
                        className='h-4 w-4'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M19.5 8.25l-7.5 7.5-7.5-7.5'
                        />
                      </svg>
                    )}
                  </button>
                </div>
                {show._id === order._id && show.status ? (
                  <div>
                    {order.list.map(prod => {
                      return (
                        <div
                          key={prod._id}
                          className='flex items-center justify-between border-b border-main/[0.2] p-2'
                        >
                          <p className='font-bold'>{prod.name}</p>
                          <p>{prod.quantity} шт.</p>
                          <p>Сумма: {prod.cost}</p>
                        </div>
                      );
                    })}
                    <div className='flex items-center justify-between p-2'>
                      <p className='text-lg text-main/[0.8]'>Итого:</p>
                      <p className='text-xl font-bold text-main'>
                        {order.costOrder} ₽
                      </p>
                    </div>
                  </div>
                ) : null}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default GetAllOrders;
