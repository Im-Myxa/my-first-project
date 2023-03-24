import React from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  getAllMaster,
  removeMaster
} from '../../store/features/master/masterSlice';

const MasterCard = ({ master, onShow }) => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const handleRemoveMaster = async () => {
    try {
      await dispatch(removeMaster(master._id));
      dispatch(getAllMaster());
    } catch (error) {
      return error;
    }
  };

  return (
    <div className='overflow-screen group relative flex rounded-lg border border-main/[0.5] text-xl text-main'>
      <NavLink to={`/products/${master._id}`}>
        <div className='my-2 ml-2 hover:shadow-lg group-hover:opacity-75'>
          {master.image ? (
            <img
              src={`http://localhost:8080/${master.image}`}
              className='flex max-h-[400px] flex-shrink-0 rounded-lg object-cover'
            />
          ) : (
            <img
              src={`https://нт.элитсад.рф/assets/components/project/app/img/empty.png`}
              className=''
            />
          )}
        </div>
      </NavLink>
      <div className='m-2 w-full items-center'>
        <NavLink to={`/products/${master._id}`}>
          <h2 className='w-full'>{master.name}</h2>
          <p>{master.specialization}</p>
          <p>{master.description}</p>
        </NavLink>
        {pathname === '/adminPage' ? (
          <div className='absolute bottom-2 right-2 flex'>
            <button
              className='flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full hover:bg-main/[0.1]'
              onClick={() => onShow({ status: true, _id: master._id })}
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
                  d='M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10'
                />
              </svg>
            </button>
            <button
              className='flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full hover:bg-main/[0.1]'
              onClick={handleRemoveMaster}
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
        ) : (
          <button className='flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full hover:bg-main/[0.1]'>
            <svg
              data-v-11c334b8=''
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
              className='ui-icon  add-cart-icon'
            >
              <path
                d='M8 10V8H6V12.5C6 12.7761 5.77614 13 5.5 13C5.22386 13 5 12.7761 5 12.5V7H8C8 4.59628 9.95227 3 12 3C14.0575 3 16 4.70556 16 7H19V19.5C19 20.3284 18.3284 21 17.5 21H12.5C12.2239 21 12 20.7761 12 20.5C12 20.2239 12.2239 20 12.5 20H17.5C17.7761 20 18 19.7761 18 19.5V8H16V10H15V8H9V10H8ZM12 4C10.4477 4 9 5.20372 9 7H15C15 5.29444 13.5425 4 12 4Z'
                fill='black'
              ></path>
              <path
                d='M7.5 14C7.77614 14 8 14.2239 8 14.5V17H10.5C10.7761 17 11 17.2239 11 17.5C11 17.7761 10.7761 18 10.5 18H8V20.5C8 20.7761 7.77614 21 7.5 21C7.22386 21 7 20.7761 7 20.5V18H4.5C4.22386 18 4 17.7761 4 17.5C4 17.2239 4.22386 17 4.5 17H7V14.5C7 14.2239 7.22386 14 7.5 14Z'
                fill='black'
              ></path>
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

MasterCard.propTypes = {
  master: PropTypes.object,
  onShow: PropTypes.func
};

export default MasterCard;
