/* eslint-disable indent */
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getAllOrdersByUser } from '../../../store/features/order/orderSlice';
import { formatDate } from '../../../utils/formatDate';
import { formatQuantity } from '../../../utils/formatQuantity';

const UserOrderMenu = () => {
  const [listOrders, setListOrders] = useState('');

  const { userId } = useParams();
  const dispatch = useDispatch();

  const getOrders = async () => {
    try {
      const orders = await dispatch(getAllOrdersByUser(userId));
      setListOrders(orders.payload);
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <div className='font-mill mx-auto items-center gap-4 text-base text-main'>
      <p className='border-b border-main/[0.2] pb-1 text-lg'>Все заказы</p>
      {listOrders
        ? listOrders.map(order => {
            return (
              <div key={order._id} className='border border-main/[0.2]'>
                <p className='border-b border-main/[0.2] p-2 text-lg'>
                  ID заказа: {order._id}
                </p>
                <div className='flex border-b border-main/[0.2]'>
                  <div className='w-[150px] p-2 text-main/[0.7]'>
                    <p>Дата заказа:</p>
                    <p>Сумма заказа:</p>
                  </div>
                  <div className='p-2'>
                    <p>{formatDate(order.date)}</p>
                    <p>{order.costOrder} ₽</p>
                  </div>
                </div>
                <div className='w-full items-center justify-between'>
                  <p className='items-center border-b border-main/[0.2] p-2'>
                    {order.list.length} {formatQuantity(order.list.length)}:
                  </p>
                  {order.list.map(prod => {
                    return (
                      <div
                        key={prod._id}
                        className='items-center space-y-2 border-b border-main/[0.2] p-2'
                      >
                        <p className='font-bold'>{prod.name}</p>
                        <div className='flex gap-4'>
                          <p>{prod.quantity} шт.</p>
                          <p>Сумма: {prod.cost} ₽</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })
        : null}
    </div>
  );
};

export default UserOrderMenu;
